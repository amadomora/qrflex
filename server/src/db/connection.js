import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const poolConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Id29283980**2024',
  database: process.env.DB_NAME || 'qrflex_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
};

let pool = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(poolConfig);
  }
  return pool;
}

export async function testConnection() {
  try {
    const p = getPool();
    const [rows] = await p.query('SELECT 1 as is_alive');
    return { success: true, isAlive: rows[0]?.is_alive === 1 };
  } catch (error) {
    return { success: false, error: error.message, code: error.code };
  }
}

