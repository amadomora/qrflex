import { Router } from 'express';
import { db } from '../data/db.js';
import { QRService } from '../services/qrService.js';

const router = Router();

/**
 * Función auxiliar para detectar el idioma preferido a partir de la cabecera HTTP Accept-Language
 */
function resolveLanguage(acceptLanguageHeader) {
  if (!acceptLanguageHeader) return 'es';
  const header = acceptLanguageHeader.toLowerCase();
  
  if (header.includes('fr')) return 'fr';
  if (header.includes('en')) return 'en';
  if (header.includes('es')) return 'es';
  
  return 'es'; // Fallback por defecto a Español
}

// ==============================================================================
// 1. ENDPOINT DE ESCANEO DINÁMICO (Híbrido)
// GET /q/:slug -> Invocado al escanear el QR físico con el smartphone
// ==============================================================================
router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const site = db.getBySlug(slug);

  if (!site) {
    return res.status(404).send(`
      <html>
        <body style="font-family:sans-serif; text-align:center; padding:50px;">
          <h2>Sitio no encontrado</h2>
          <p>El código QR escaneado no corresponde a ningún sitio turístico activo.</p>
        </body>
      </html>
    `);
  }

  // 1. Detectar el idioma del móvil mediante cabeceras HTTP
  const acceptLang = req.headers['accept-language'];
  const detectedLang = resolveLanguage(acceptLang);

  // 2. Registrar métrica de escaneo en la base de datos
  db.recordScan(slug, detectedLang);

  // 3. Determinar URL del Frontend destino hacia la página individual dedicada
  const cleanPageMap = {
    'chicamocha': '/chicamocha',
    'canon-del-chicamocha': '/chicamocha',
    'panachi': '/panachi',
    'panachi-parque-nacional': '/panachi',
    'barichara': '/barichara',
    'barichara-colonial': '/barichara'
  };
  const pagePath = cleanPageMap[slug.toLowerCase()] || `/${slug}`;
  const targetUrl = `${pagePath}?lang=${detectedLang}`;

  // Si la petición espera JSON (ej: prueba desde app móvil o fetch)
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({
      success: true,
      siteSlug: slug,
      detectedLanguage: detectedLang,
      redirectUrl: targetUrl,
      siteTitle: site.translations[detectedLang]?.title || site.translations.es.title
    });
  }

  // Redirección HTTP hacia la Landing Page de React con el idioma ya detectado
  res.redirect(302, targetUrl);
});

// ==============================================================================
// 2. GENERADOR DE CÓDIGOS QR PARA IMPRENTA Y PANTALLA
// GET /api/qr/:slug?format=svg|png|signage
// ==============================================================================
router.get('/render/:slug', async (req, res) => {
  const { slug } = req.params;
  const { format = 'svg', width = 600 } = req.query;
  const site = db.getBySlug(slug);

  if (!site) {
    return res.status(404).json({ success: false, message: 'Sitio no encontrado.' });
  }

  // URL dinámica que apuntará al backend
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.get('host') || 'localhost:5000';
  const dynamicScanUrl = `${protocol}://${host}/q/${slug}`;

  try {
    if (format === 'signage') {
      // Retorna el póster vectorial completo con el QR y las banderas al pie
      const signageSvg = await QRService.generateSignageSVG(dynamicScanUrl, site.translations.es.title);
      res.setHeader('Content-Type', 'image/svg+xml');
      return res.send(signageSvg);
    }

    if (format === 'png') {
      // PNG en alta resolución (para imprenta física)
      const dataUrl = await QRService.generatePNG(dynamicScanUrl, { width: parseInt(width) });
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');

      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `attachment; filename="qr-${slug}.png"`);
      return res.send(imgBuffer);
    }

    // Por defecto: SVG vectorial limpio
    const svg = await QRService.generateSVG(dynamicScanUrl);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);

  } catch (error) {
    console.error('[QR Engine] Error generando código:', error);
    res.status(500).json({ success: false, message: 'Error al generar el código QR.', error: error.message });
  }
});

export default router;

