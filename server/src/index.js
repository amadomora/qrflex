import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import sitesRouter from './routes/sites.js';
import qrRouter from './routes/qr.js';
import statsRouter from './routes/stats.js';
import authRouter from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos públicos y recursos estáticos (imágenes de sitios y frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API REST para el Panel de Administración y Frontend
app.use('/api/auth', authRouter);
app.use('/api/sites', sitesRouter);
app.use('/api/qr', qrRouter);
app.use('/api/stats', statsRouter);

// Enrutador del código QR dinámico (ej: /q/canon-del-chicamocha)
app.use('/q', qrRouter);

// Servir la vista interactiva del Sitio Turístico (Landing y CMS)
app.get(['/site/:slug', '/landing', '/app'], (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Favicon handler para evitar error 404 en navegador
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Health check y raíz informativa
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'QRFlex Turismo Santander API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  // Si el usuario abre desde el navegador web, mostrar la Landing interactiva
  if (req.accepts('html')) {
    return res.sendFile(path.join(__dirname, '../public/index.html'));
  }
  
  res.json({
    message: 'Bienvenido al Backend de QRFlex Turismo Santander',
    endpoints: {
      webLanding: '/site/canon-del-chicamocha',
      sites: '/api/sites',
      chicamochaExample: '/api/sites/canon-del-chicamocha',
      qrRenderSvg: '/api/qr/render/canon-del-chicamocha?format=svg',
      qrRenderSignage: '/api/qr/render/canon-del-chicamocha?format=signage',
      stats: '/api/stats',
      smartScan: '/q/canon-del-chicamocha'
    }
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(` ⛰️  QRFlex Turismo Backend iniciado con éxito`);
  console.log(` 📍  Escuchando en: http://localhost:${PORT}`);
  console.log(` 🚀  Ejemplo Cañón Chicamocha: http://localhost:${PORT}/api/sites/canon-del-chicamocha`);
  console.log(` 📲  Ruta de Escaneo QR: http://localhost:${PORT}/q/canon-del-chicamocha`);
  console.log(`=======================================================`);
});

export default app;

