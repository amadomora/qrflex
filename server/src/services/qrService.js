import QRCode from 'qrcode';

/**
 * Servicio generador de códigos QR inteligentes y vectoriales
 * Módulo del agente: qr-engine
 */
export class QRService {
  /**
   * Genera código QR en formato SVG vectorial
   * @param {string} url - URL de destino (ej: http://tudominio/q/canon-del-chicamocha)
   * @param {object} options
   */
  static async generateSVG(url, options = {}) {
    const defaultOptions = {
      type: 'svg',
      errorCorrectionLevel: 'H', // Alta corrección de error para exteriores/intemperie
      margin: 2,
      color: {
        dark: '#064e3b', // Verde esmeralda de Santander
        light: '#ffffff'
      },
      ...options
    };

    return await QRCode.toString(url, defaultOptions);
  }

  /**
   * Genera código QR en formato PNG DataURL o Buffer
   * @param {string} url
   * @param {object} options
   */
  static async generatePNG(url, options = {}) {
    const defaultOptions = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 2,
      width: options.width || 600, // Alta definición para imprenta
      color: {
        dark: '#064e3b',
        light: '#ffffff'
      },
      ...options
    };

    return await QRCode.toDataURL(url, defaultOptions);
  }

  /**
   * Retorna una composición SVG que incluye el código QR y las banderas en el pie
   */
  static async generateSignageSVG(url, siteTitle = 'Cañón del Chicamocha') {
    const rawQrSvg = await this.generateSVG(url, { margin: 1 });
    
    // Convertir el QR generado en un elemento <svg> embebido con su propio viewBox y escala
    const embeddedQr = rawQrSvg.replace(
      /<svg\s+xmlns="[^"]+"\s+viewBox="([^"]+)"[^>]*>/i,
      '<svg x="70" y="110" width="260" height="260" viewBox="$1">'
    );

    // Envolver el SVG del QR dentro de un póster con las banderas en la base
    const svgSignage = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 530" width="100%" height="100%">
  <defs>
    <style>
      .title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-weight: 800; font-size: 17px; fill: #064e3b; text-anchor: middle; letter-spacing: 0.5px; }
      .subtitle { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 11px; fill: #047857; text-anchor: middle; font-weight: 600; letter-spacing: 1px; }
      .footer-heading { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-weight: 700; font-size: 10px; fill: #64748b; text-anchor: middle; letter-spacing: 0.8px; }
      .flag-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 700; fill: #1e293b; text-anchor: middle; }
      .cta-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 600; fill: #059669; text-anchor: middle; }
    </style>
  </defs>

  <!-- Fondo de la placa con sombra simulada -->
  <rect x="5" y="5" width="390" height="520" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  
  <!-- Encabezado superior estilizado -->
  <rect x="20" y="20" width="360" height="64" rx="14" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.5"/>
  <text x="200" y="47" class="title">${siteTitle.toUpperCase()}</text>
  <text x="200" y="68" class="subtitle">INFORMACIÓN Y GUÍA MULTILINGÜE</text>

  <!-- Marco blanco y sombra para el Código QR -->
  <rect x="58" y="98" width="284" height="284" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <rect x="66" y="106" width="268" height="268" rx="14" fill="#f8fafc"/>
  
  <!-- Inyección del código QR escalado -->
  ${embeddedQr}

  <!-- Llamado a la acción -->
  <text x="200" y="400" class="cta-text">ESCANEA CON LA CÁMARA DE TU SMARTPHONE</text>

  <!-- Marco de Banderas al pie como solicitó el usuario -->
  <rect x="20" y="415" width="360" height="92" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="200" y="435" class="footer-heading">IDIOMAS DISPONIBLES / AVAILABLE LANGUAGES</text>
  
  <!-- Fila de Banderas y Etiquetas Vectoriales -->
  <g transform="translate(30, 442)">
    
    <!-- 1. Colombia / Español -->
    <g transform="translate(15, 0)">
      <rect width="70" height="42" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <!-- Bandera CO -->
      <g transform="translate(23, 7)">
        <rect width="24" height="6" fill="#fcd116"/>
        <rect y="6" width="24" height="3" fill="#003893"/>
        <rect y="9" width="24" height="3" fill="#ce1126"/>
      </g>
      <text x="35" y="32" class="flag-label">Español</text>
    </g>

    <!-- 2. USA / English -->
    <g transform="translate(135, 0)">
      <rect width="70" height="42" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <!-- Bandera US -->
      <g transform="translate(23, 7)">
        <rect width="24" height="12" fill="#bf0a30"/>
        <line x1="0" y1="2" x2="24" y2="2" stroke="#ffffff" stroke-width="1"/>
        <line x1="0" y1="4" x2="24" y2="4" stroke="#ffffff" stroke-width="1"/>
        <line x1="0" y1="6" x2="24" y2="6" stroke="#ffffff" stroke-width="1"/>
        <line x1="0" y1="8" x2="24" y2="8" stroke="#ffffff" stroke-width="1"/>
        <line x1="0" y1="10" x2="24" y2="10" stroke="#ffffff" stroke-width="1"/>
        <rect width="10" height="6" fill="#002868"/>
      </g>
      <text x="35" y="32" class="flag-label">English</text>
    </g>

    <!-- 3. Francia / Français -->
    <g transform="translate(255, 0)">
      <rect width="70" height="42" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <!-- Bandera FR -->
      <g transform="translate(23, 7)">
        <rect width="8" height="12" fill="#0055a4"/>
        <rect x="8" width="8" height="12" fill="#ffffff"/>
        <rect x="16" width="8" height="12" fill="#ef4135"/>
      </g>
      <text x="35" y="32" class="flag-label">Français</text>
    </g>

  </g>
</svg>
    `.trim();

    return svgSignage;
  }
}

