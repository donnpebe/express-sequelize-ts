import { Sequelize } from 'sequelize';

const isTest = process.env.NODE_ENV === 'test';

const dbName = isTest ? (process.env.TEST_DB_NAME as string) : (process.env.DB_NAME as string);
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASS || '';
const dbHost = process.env.DB_HOST || 'localhost';

const connection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
});

export default connection;
