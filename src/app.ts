import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import requestIp from 'request-ip';
import { container } from 'tsyringe';

import { Config } from './config/config';
import { logger } from './middlewares/morgan';
import { errorHandler } from './middlewares/error-handler';
import { routes as authRoutes } from './routes/auth.routes';
import { Database } from './db/database';
import { register as registerDbInjector } from './db/db.injector';
import { Project, ProjectAssignment, User } from './db/models';

registerDbInjector(container);
Database.init(container.resolve(Config), [User, Project, ProjectAssignment]);

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
