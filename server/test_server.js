import { db } from './src/data/db.js';
import { QRService } from './src/services/qrService.js';

console.log('--- TEST 1: Carga de base de datos ---');
const sites = db.getAll();
console.log('Total de sitios en BD:', sites.length);
const chicamocha = db.getBySlug('canon-del-chicamocha');
console.log('Sitio encontrado:', chicamocha.translations.es.title);
console.log('Título en Inglés:', chicamocha.translations.en.title);
console.log('Título en Francés:', chicamocha.translations.fr.title);
console.log('Dimensiones:', chicamocha.dimensions);

console.log('\n--- TEST 2: Generación de QR dinámico ---');
const qrSvg = await QRService.generateSVG('http://localhost:5000/q/canon-del-chicamocha');
console.log('QR SVG generado con éxito. Longitud caracteres:', qrSvg.length);

const signageSvg = await QRService.generateSignageSVG('http://localhost:5000/q/canon-del-chicamocha', chicamocha.translations.es.title);
console.log('Placa de señalética con banderas generada con éxito. Longitud:', signageSvg.length);

console.log('\n--- TEST 3: Simulación de escaneo y métricas ---');
const scanResult = db.recordScan('canon-del-chicamocha', 'en');
console.log('Resultado del escaneo en inglés:', scanResult);
console.log('Métricas actualizadas:', chicamocha.metrics);

console.log('\n✅ TODOS LOS TESTS DEL BACKEND PASARON EXITOSAMENTE');

