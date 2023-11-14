import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import { prisma } from '../utils/db.server';
import UserService from '../services/UserService';
import { COOKIE_NAME } from '../config';
import authenticate from '../middleware/authenticate';
import createHttpError from 'http-errors';
import { Prisma } from '@prisma/client';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 60;

export default Router()
  .post('/', async (req: Request, res: Response) => {
    try {
      const [user, token] = await UserService.signUpUser(req.body);
      res
        .cookie(COOKIE_NAME || 'defaultCookie', token, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json(user);
    } catch (error) {
      console.error(error);
    }
  })
  .get(
    '/:id',
    authenticate as RequestHandler,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const user = await prisma.users.findUnique({
          where: {
            id: Number(id),
          },
          select: selectUser,
        });

        if (!user) throw createHttpError(404, 'user not Found');
        res.json(user);
      } catch (error) {
        next(error);
      }
    },
  );

const selectUser: Prisma.UsersSelect = { id: true, email: true };
