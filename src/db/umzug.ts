import connection from './index';
import { Umzug, SequelizeStorage } from 'umzug';

export default new Umzug({
  migrations: {
    glob: ['./migrations/*.{js,ts}', { cwd: __dirname }],
  },
  context: connection,
  storage: new SequelizeStorage({
    sequelize: connection,
    modelName: 'migration_meta',
  }),
  logger: console,
});
