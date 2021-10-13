import dotenv from 'dotenv';
dotenv.config();

import { injectable } from 'tsyringe';

@injectable()
export class ConfigService {
  public readonly jwtKey: string = process.env.JWT_KEY || '';
}
