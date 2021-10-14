import { ModelCtor, Sequelize } from 'sequelize-typescript';
import { Config } from '../config/config';

export class Database {
  private static connection: Sequelize;

  static init(config: Config, models?: ModelCtor[]) {
    Database.connection = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
      host: config.dbHost,
      dialect: 'postgres',
      models,
    });
  }

  static getConnection(): Sequelize {
    return Database.connection;
  }
}
