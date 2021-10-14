import { Database } from './database';
import { Config } from '../config/config';
import { Umzug, SequelizeStorage } from 'umzug';

Database.init(new Config());

export default new Umzug({
  migrations: {
    glob: ['./migrations/*.{js,ts}', { cwd: __dirname }],
  },
  context: Database.getConnection(),
  storage: new SequelizeStorage({
    sequelize: Database.getConnection(),
    modelName: 'migration_meta',
  }),
  logger: console,
});
