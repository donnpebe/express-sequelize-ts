import { randomBytes } from 'crypto';
import argon2 from 'argon2';

export class Password {
  static async toHash(password: string): Promise<{ hashedPassword: string; salt: string }> {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword: string = await argon2.hash(password, { salt: Buffer.from(salt) });
    return { hashedPassword, salt };
  }

  static async compare(
    hashedPassword: string,
    salt: string,
    plainPassword: string
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, plainPassword, { salt: Buffer.from(salt) });
  }
}
