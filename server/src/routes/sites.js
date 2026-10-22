import { Router } from 'express';
import { db } from '../data/db.js';

const router = Router();

// GET /api/sites - Listar todos los sitios con resumen para el panel de administración
router.get('/', (req, res) => {
  const sites = db.getAll();
  const summary = sites.map(site => ({
    id: site.id,
    slug: site.slug,
    category: site.category,
    categoryName: site.categoryName,
    department: site.location?.department,
    titleES: site.translations?.es?.title || site.slug,
    titleEN: site.translations?.en?.title || '',
    titleFR: site.translations?.fr?.title || '',
    totalScans: site.metrics?.totalScans || 0,
    coordinates: site.location?.coordinates
  }));

  res.json({
    success: true,
    count: summary.length,
    data: summary
  });
});

// GET /api/sites/:slug - Obtener información completa multilingüe de un sitio
router.get('/:slug', (req, res) => {
  const site = db.getBySlug(req.params.slug);
  if (!site) {
    return res.status(404).json({
      success: false,
      message: `Sitio turístico con slug '${req.params.slug}' no encontrado.`
    });
  }

  // Soporte para filtrar por idioma si se envía en la query ?lang=en
  const lang = req.query.lang;
  if (lang && site.translations[lang]) {
    return res.json({
      success: true,
      selectedLanguage: lang,
      site: {
        id: site.id,
        slug: site.slug,
        category: site.category,
        categoryName: site.categoryName[lang] || site.categoryName.es,
        location: site.location,
        dimensions: site.dimensions,
        climate: site.climate,
        images: site.images,
        content: site.translations[lang],
        metrics: site.metrics
      }
    });
  }

  // Devolver todo el objeto multilingüe completo (para el Admin o Landing con i18n)
  res.json({
    success: true,
    data: site
  });
});

// POST /api/sites - Crear un nuevo sitio turístico desde el CMS Admin
router.post('/', (req, res) => {
  const { slug, category, translations, location, dimensions, climate, images } = req.body;

  if (!slug || !translations?.es?.title) {
    return res.status(400).json({
      success: false,
      message: 'El slug y al menos el título en Español (es) son requeridos.'
    });
  }

  // Verificar si el slug ya existe
  if (db.getBySlug(slug)) {
    return res.status(409).json({
      success: false,
      message: `Ya existe un sitio con el slug '${slug}'. Elija uno diferente.`
    });
  }

  const newSite = db.create({
    slug: slug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-'),
    category: category || 'canyon',
    categoryName: req.body.categoryName || {
      es: 'Atractivo Turístico',
      en: 'Tourist Attraction',
      fr: 'Attraction Touristique'
    },
    location: location || {},
    dimensions: dimensions || {},
    climate: climate || {},
    images: images || { hero: '/images/default.jpg' },
    translations: translations || {}
  });

  res.status(201).json({
    success: true,
    message: 'Sitio turístico creado exitosamente.',
    data: newSite
  });
});

// PUT /api/sites/:slug - Actualizar un sitio existente
router.put('/:slug', (req, res) => {
  const updated = db.update(req.params.slug, req.body);
  if (!updated) {
    return res.status(404).json({
      success: false,
      message: `Sitio con slug '${req.params.slug}' no encontrado.`
    });
  }

  res.json({
    success: true,
    message: 'Sitio actualizado exitosamente.',
    data: updated
  });
});

// DELETE /api/sites/:slug - Eliminar sitio
router.delete('/:slug', (req, res) => {
  const deleted = db.delete(req.params.slug);
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: `Sitio con slug '${req.params.slug}' no encontrado.`
    });
  }

  res.json({
    success: true,
    message: 'Sitio eliminado exitosamente.'
  });
});

export default router;

