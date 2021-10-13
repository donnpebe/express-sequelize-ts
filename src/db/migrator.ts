import dotenv from 'dotenv';
dotenv.config();

import migrator from './umzug';

export type Migration = typeof migrator._types.migration;

if (require.main === module) {
  migrator
    .runAsCLI()
    .catch(e => console.error('An error occured when running the migration tasks: ', e));
}
