/* eslint-disable no-console */
import express, { Express } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import usersController from './controllers/usersController';

dotenv.config();

if (!process.env.PORT) {
  console.log('No PORT detected!');
  process.exit(1);
}

const app: Express = express();

app.use(
  cors({
    origin: ['http://127.0.0.1:5173'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/users', usersController);

export default app;
