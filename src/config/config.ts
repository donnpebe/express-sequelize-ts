import dotenv from 'dotenv';
dotenv.config();

import { singleton } from 'tsyringe';

@singleton()
export class Config {
  public readonly dbHost: string = process.env.DB_HOST || '';
  public readonly dbName: string = process.env.DB_NAME || '';
  public readonly dbUser: string = process.env.DB_USER || '';
  public readonly dbPass: string = process.env.DB_PASS || '';
  public readonly jwtKey: string = process.env.JWT_KEY || '';
}
