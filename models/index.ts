import { readdirSync } from 'fs';
import { basename, join } from 'path';
import { Sequelize } from 'sequelize';

const baseName = basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const dbUrl = process.env[config.use_env_variable] || '';

const db: any = {};

const sequelize = dbUrl
  ? new Sequelize(dbUrl, config)
  : new Sequelize(config.database, config.username, config.password, config);

readdirSync(__dirname)
  .filter((file: string) => {
    return file.indexOf('.') !== 0 && file !== baseName && file.slice(-3) === '.ts';
  })
  .forEach((file: any) => {
    const model = require(join(__dirname, file));

    model.init(sequelize);
    db[model.default.name] = model.default;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].hasOwnProperty('associate')) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
