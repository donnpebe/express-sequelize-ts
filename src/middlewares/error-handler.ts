import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof CustomError) {
    const errors = err.serializeErrors();
    const obj = Array.isArray(errors) ? { errors } : { error: errors };
    return res.status(err.statusCode).send(obj);
  }

  res.status(500).send({
    error: {
      message: 'Something went wrong',
    },
  });
};
