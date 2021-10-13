import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { IUserRepo } from '../db/interfaces/user.repo.interface';
import { SignInDto, SignUpDto } from '../domain/auth/auth.dto';
import { UserDomain } from '../domain/user/user.domain';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { Password } from '../utils/password';
import { ConfigService } from './config.service';
import { BadRequestError } from '../errors/bad-request-error';

@injectable()
export class AuthService {
  constructor(
    @inject('IUserRepo') private userRepo: IUserRepo,
    private configService: ConfigService
  ) {}

  async signIn(dto: SignInDto): Promise<{ accessToken: string; user: UserDomain }> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedError('must provide a valid email and password');
    }

    const passwordMatch = await Password.compare(user.password, user.salt, dto.password);
    if (!passwordMatch) {
      throw new UnauthorizedError('must provide a valid email and password');
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      this.configService.jwtKey,
      {
        subject: user.id,
      }
    );

    return {
      accessToken,
      user,
    };
  }

  async signUp(dto: SignUpDto): Promise<UserDomain> {
    const exists = await this.userRepo.emailExists(dto.email);
    if (exists) {
      throw new BadRequestError('email in use');
    }

    const { hashedPassword, salt } = await Password.toHash(dto.password);

    const user = await this.userRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      salt,
    });

    return user;
  }
}
