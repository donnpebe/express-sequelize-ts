import { Request } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

import { SignInDto, SignUpDto } from '../domain/auth/auth.dto';

export class AuthValidator {
  static async signIn(req: Request): Promise<SignInDto> {
    await body('email')
      .exists({ checkFalsy: true })
      .withMessage('must provide a valid email and password')
      .isEmail()
      .withMessage('must provide a valid email and password')
      .normalizeEmail()
      .run(req);
    await body('password')
      .exists({ checkFalsy: true })
      .withMessage('must provide a valid email and password')
      .trim()
      .run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new RequestValidationError(result.array());
    }

    return {
      email: req.body.email as string,
      password: req.body.password as string,
    };
  }

  static async signUp(req: Request): Promise<SignUpDto> {
    await body('email')
      .isEmail()
      .withMessage('must provide a valid email')
      .normalizeEmail()
      .run(req);
    await body('name')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 80 })
      .withMessage('name must be maximum 80 characters')
      .run(req);
    await body('password')
      .trim()
      .isLength({ min: 8, max: 80 })
      .withMessage('password must be between 8 and 80 characters')
      .run(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      // console.log(result.array());
      throw new RequestValidationError(result.array());
    }

    return {
      email: req.body.email as string,
      name: req.body.name as string,
      password: req.body.password as string,
    };
  }
}
