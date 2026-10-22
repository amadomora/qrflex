import { Router } from 'express';
import { db } from '../data/db.js';

const router = Router();

// GET /api/stats - Resumen de analítica global para el panel de administración
router.get('/', (req, res) => {
  const sites = db.getAll();

  let totalScans = 0;
  const scansByLang = { es: 0, en: 0, fr: 0 };
  const sitesRanking = [];

  sites.forEach(site => {
    const siteScans = site.metrics?.totalScans || 0;
    totalScans += siteScans;

    scansByLang.es += site.metrics?.scansByLanguage?.es || 0;
    scansByLang.en += site.metrics?.scansByLanguage?.en || 0;
    scansByLang.fr += site.metrics?.scansByLanguage?.fr || 0;

    sitesRanking.push({
      id: site.id,
      slug: site.slug,
      title: site.translations?.es?.title || site.slug,
      totalScans: siteScans,
      byLang: site.metrics?.scansByLanguage || { es: 0, en: 0, fr: 0 },
      lastScannedAt: site.metrics?.lastScannedAt
    });
  });

  // Ordenar de mayor a menor escaneos
  sitesRanking.sort((a, b) => b.totalScans - a.totalScans);

  res.json({
    success: true,
    data: {
      totalSites: sites.length,
      totalScans,
      scansByLanguage: scansByLang,
      topSites: sitesRanking
    }
  });
});

export default router;

