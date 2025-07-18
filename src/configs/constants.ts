import * as dotenv from 'dotenv';
// import path from 'path';

dotenv.config();

const AppConfigs = {
  /** Server Configs */
  app_port: process.env.APP_PORT,
  app_url: process.env.APP_URL,

  /** Database Connection */
  db_host: process.env.DB_HOST ?? 'localhost',
  db_port: parseInt(process.env.DB_PORT ?? '3306'),
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,

  /** File Operations Paths */
  // rootDir: process.cwd(),
  // storageDir: path.join(process.cwd(), 'storage'),
  // publicFilesDir: path.join(process.cwd(), 'storage', 'public'),
  // privateFilesDir: path.join(process.cwd(), 'storage', 'private'),
  // backupDir: path.join(process.cwd(), 'storage', 'backup'),
  // tempDir: path.join(process.cwd(), 'storage', 'temp'),
  // logDir: path.join(process.cwd(), 'storage', 'logs'),

  /** Security */
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,

  /** Mailing */
  // smpt_server: process.env.SMTP_SERVER,
  // smpt_user: process.env.SMTP_USER,
  // smpt_password: process.env.SMTP_PASSWORD,
};

export default AppConfigs;
