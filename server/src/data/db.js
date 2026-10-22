import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialSites } from './sites.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'sites_store.json');

class Database {
  constructor() {
    this.sites = [];
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.sites = JSON.parse(raw);
      } else {
        this.sites = [...initialSites];
        this.save();
      }
    } catch (err) {
      console.error('[DB] Error cargando base de datos, usando semillas iniciales:', err);
      this.sites = [...initialSites];
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.sites, null, 2), 'utf-8');
    } catch (err) {
      console.error('[DB] Error guardando archivo:', err);
    }
  }

  getAll() {
    return this.sites;
  }

  getBySlug(slug) {
    return this.sites.find(s => s.slug.toLowerCase() === slug.toLowerCase());
  }

  getById(id) {
    return this.sites.find(s => s.id === id);
  }

  create(siteData) {
    const newSite = {
      id: `site_${Date.now()}`,
      metrics: {
        totalScans: 0,
        scansByLanguage: { es: 0, en: 0, fr: 0 },
        lastScannedAt: null
      },
      ...siteData
    };
    this.sites.push(newSite);
    this.save();
    return newSite;
  }

  update(slug, updatedFields) {
    const index = this.sites.findIndex(s => s.slug.toLowerCase() === slug.toLowerCase());
    if (index === -1) return null;

    this.sites[index] = {
      ...this.sites[index],
      ...updatedFields,
      slug: updatedFields.slug || this.sites[index].slug // mantener o actualizar slug
    };
    this.save();
    return this.sites[index];
  }

  delete(slug) {
    const index = this.sites.findIndex(s => s.slug.toLowerCase() === slug.toLowerCase());
    if (index === -1) return false;
    this.sites.splice(index, 1);
    this.save();
    return true;
  }

  recordScan(slug, detectedLang = 'es') {
    const site = this.getBySlug(slug);
    if (!site) return null;

    if (!site.metrics) {
      site.metrics = { totalScans: 0, scansByLanguage: { es: 0, en: 0, fr: 0 }, lastScannedAt: null };
    }

    const lang = ['es', 'en', 'fr'].includes(detectedLang) ? detectedLang : 'es';
    site.metrics.totalScans = (site.metrics.totalScans || 0) + 1;
    site.metrics.scansByLanguage[lang] = (site.metrics.scansByLanguage[lang] || 0) + 1;
    site.metrics.lastScannedAt = new Date().toISOString();

    this.save();
    return {
      totalScans: site.metrics.totalScans,
      language: lang
    };
  }
}

export const db = new Database();

