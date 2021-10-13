import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import requestIp from 'request-ip';

import { logger } from './middlewares/morgan';
import { routes as authRoutes } from './routes/auth.routes';
import { register as registerDbInjector } from './db/db.injector';
import { container } from 'tsyringe';
import { errorHandler } from './middlewares/error-handler';

registerDbInjector(container);

const app = express();

app.use(requestIp.mw());
app.use(logger());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', authRoutes());

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ message: `Welcome!` });
});

app.use(errorHandler);

export default app;
