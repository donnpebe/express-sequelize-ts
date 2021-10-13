import { Request, Response, NextFunction } from 'express';
import { inject, injectable, container, singleton } from 'tsyringe';
import { UserMapper } from '../domain/user/user.mapper';
import { AuthService } from '../services/auth.services';
import { AuthValidator } from '../validators/auth.validator';
import { BadRequestError } from '../errors/bad-request-error';

@injectable()
export class AuthController {
  constructor(private authService: AuthService) {}

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    // try {
    const dto = await AuthValidator.signIn(req);
    const { accessToken, user } = await this.authService.signIn(dto);

    const data = {
      accessToken,
      user: UserMapper.toUserDto(user),
    };

    res.status(200).send(data);
    // } catch (err) {
    //   throw err;
    // }
  };

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await AuthValidator.signUp(req);
      const user = await this.authService.signUp(dto);
      res.status(201).send({
        user: UserMapper.toUserDto(user),
      });
    } catch (err) {
      next(err);
    }
  };
}
