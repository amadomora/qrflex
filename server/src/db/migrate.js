import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialSites } from '../data/sites.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = parseInt(process.env.DB_PORT || '3306');
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Id29283980**2024';
const DB_NAME = process.env.DB_NAME || 'qrflex_db';

export async function runMigration() {
  console.log('=======================================================');
  console.log(` Iniciando migración de MariaDB para QRFlex Turismo`);
  console.log(` Conectando a: ${DB_USER}@${DB_HOST}:${DB_PORT}`);
  console.log('=======================================================');

  let connection;
  try {
    // 1. Conexión inicial al servidor MariaDB
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });

    console.log('✔ Conexión exitosa al motor MariaDB');

    // 2. Crear Base de Datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`✔ Base de datos '${DB_NAME}' verificada o creada`);

    await connection.changeUser({ database: DB_NAME });

    // 3. Crear Tabla de Roles (RBAC)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        display_name VARCHAR(100) NOT NULL,
        description VARCHAR(255),
        permissions JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✔ Tabla [roles] verificada');

    // 4. Crear Tabla de Usuarios
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        role_id INT NOT NULL,
        is_active TINYINT(1) DEFAULT 1,
        last_login DATETIME NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✔ Tabla [users] verificada');

    // 5. Crear Tabla de Sitios Turísticos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS tourist_sites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(100) NOT NULL UNIQUE,
        category VARCHAR(50) NOT NULL,
        category_name JSON NOT NULL,
        department VARCHAR(100) NOT NULL,
        municipalities JSON NULL,
        lat DECIMAL(10, 7) NOT NULL,
        lng DECIMAL(10, 7) NOT NULL,
        elevation_meters VARCHAR(100) NULL,
        dimensions JSON NULL,
        climate JSON NULL,
        images JSON NULL,
        created_by INT NULL,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✔ Tabla [tourist_sites] verificada');

    // 6. Crear Tabla de Traducciones Multilingües (ES, EN, FR)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_translations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site_id INT NOT NULL,
        lang_code VARCHAR(5) NOT NULL,
        title VARCHAR(200) NOT NULL,
        subtitle VARCHAR(255) NULL,
        tagline TEXT NULL,
        history LONGTEXT NULL,
        biodiversity JSON NULL,
        attractions JSON NULL,
        how_to_get_there JSON NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uq_site_lang (site_id, lang_code),
        FOREIGN KEY (site_id) REFERENCES tourist_sites(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✔ Tabla [site_translations] verificada');

    // 7. Crear Tabla de Métricas y Registro de Escaneos QR
    await connection.query(`
      CREATE TABLE IF NOT EXISTS scan_logs (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        site_id INT NOT NULL,
        lang_detected VARCHAR(10) DEFAULT 'es',
        ip_hash VARCHAR(64) NULL,
        user_agent TEXT NULL,
        scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_site_scanned (site_id, scanned_at),
        FOREIGN KEY (site_id) REFERENCES tourist_sites(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✔ Tabla [scan_logs] verificada');

    // =========================================================================
    // SEED DE DATOS: ROLES
    // =========================================================================
    const roles = [
      {
        name: 'super_admin',
        display_name: 'Super Administrador',
        description: 'Control absoluto del sistema, gestión de usuarios, roles y métricas de Santander.',
        permissions: JSON.stringify(['*'])
      },
      {
        name: 'admin_turismo',
        display_name: 'Administrador de Turismo',
        description: 'Gestión completa de atractivos turísticos, edición en 3 idiomas y generación de códigos QR.',
        permissions: JSON.stringify(['sites:*', 'qr:*', 'stats:view', 'content:publish'])
      },
      {
        name: 'operador_sitio',
        display_name: 'Operador de Parque / Sitio',
        description: 'Actualización de horarios, clima, recomendaciones viales y eventos locales.',
        permissions: JSON.stringify(['sites:read', 'sites:update_content', 'qr:read'])
      },
      {
        name: 'auditor_estadistico',
        display_name: 'Auditor Turístico & Estadístico',
        description: 'Acceso a tableros de analítica, flujo de visitantes por idioma y horarios.',
        permissions: JSON.stringify(['stats:view', 'sites:read'])
      }
    ];

    for (const role of roles) {
      await connection.query(`
        INSERT INTO roles (name, display_name, description, permissions)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE display_name = VALUES(display_name), description = VALUES(description), permissions = VALUES(permissions);
      `, [role.name, role.display_name, role.description, role.permissions]);
    }
    console.log('✔ Roles del sistema inicializados');

    // =========================================================================
    // SEED DE DATOS: USUARIOS ADMINISTRATIVOS
    // =========================================================================
    const [roleRows] = await connection.query('SELECT id, name FROM roles');
    const roleMap = Object.fromEntries(roleRows.map(r => [r.name, r.id]));

    const salt = await bcrypt.genSalt(10);
    const passAdmin = await bcrypt.hash('Admin2026*', salt);
    const passGestor = await bcrypt.hash('Santander2026*', salt);

    const users = [
      {
        username: 'admin2026',
        email: 'admin2026@santander.gov.co',
        password_hash: passAdmin,
        full_name: 'Administrador Santander Digital',
        role_id: roleMap['super_admin']
      },
      {
        username: 'admin',
        email: 'admin@qrflex.co',
        password_hash: passAdmin,
        full_name: 'Administrador General QRFlex',
        role_id: roleMap['super_admin']
      },
      {
        username: 'gestor_chicamocha',
        email: 'gestor@santander.gov.co',
        password_hash: passGestor,
        full_name: 'Gestor Turístico Santander',
        role_id: roleMap['admin_turismo']
      }
    ];

    for (const u of users) {
      await connection.query(`
        INSERT INTO users (username, email, password_hash, full_name, role_id)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE email = VALUES(email), full_name = VALUES(full_name), role_id = VALUES(role_id);
      `, [u.username, u.email, u.password_hash, u.full_name, u.role_id]);
    }
    console.log('✔ Usuarios iniciales con roles sembrados');

    // =========================================================================
    // SEED DE DATOS: CAÑÓN DEL CHICAMOCHA (MAQUETA MAESTRA)
    // =========================================================================
    for (const site of initialSites) {
      const [insertSite] = await connection.query(`
        INSERT INTO tourist_sites (
          slug, category, category_name, department, municipalities, lat, lng,
          elevation_meters, dimensions, climate, images, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          category = VALUES(category),
          department = VALUES(department),
          lat = VALUES(lat),
          lng = VALUES(lng),
          dimensions = VALUES(dimensions),
          climate = VALUES(climate);
      `, [
        site.slug,
        site.category,
        JSON.stringify(site.categoryName),
        site.location.department,
        JSON.stringify(site.location.municipalities),
        site.location.coordinates.lat,
        site.location.coordinates.lng,
        site.location.elevationMeters,
        JSON.stringify(site.dimensions),
        JSON.stringify(site.climate),
        JSON.stringify(site.images),
        1 // Admin ID
      ]);

      const [siteRow] = await connection.query('SELECT id FROM tourist_sites WHERE slug = ?', [site.slug]);
      const siteId = siteRow[0].id;

      // Insertar traducciones para los 3 idiomas (ES, EN, FR)
      for (const [lang, trans] of Object.entries(site.translations)) {
        await connection.query(`
          INSERT INTO site_translations (
            site_id, lang_code, title, subtitle, tagline, history,
            biodiversity, attractions, how_to_get_there
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            subtitle = VALUES(subtitle),
            tagline = VALUES(tagline),
            history = VALUES(history),
            biodiversity = VALUES(biodiversity),
            attractions = VALUES(attractions),
            how_to_get_there = VALUES(how_to_get_there);
        `, [
          siteId,
          lang,
          trans.title,
          trans.subtitle,
          trans.tagline,
          trans.history,
          JSON.stringify(trans.biodiversity),
          JSON.stringify(trans.attractions),
          JSON.stringify(trans.howToGetThere)
        ]);
      }
      console.log(`✔ Sitio [${site.slug}] cargado en MariaDB con traducciones (ES, EN, FR)`);
    }

    console.log('=======================================================');
    console.log(' 🎉 MIGRACIÓN Y SEMBRADO COMPLETADOS EXITOSAMENTE');
    console.log('=======================================================');

  } catch (error) {
    console.error('❌ Error ejecutando la migración:', error);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
}

// Ejecutar si se llama directamente
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runMigration().then(() => process.exit(0)).catch(() => process.exit(1));
}

