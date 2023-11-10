import { Request, Response, Router } from 'express';
import { prisma } from '../utils/db.server';
import UserService from '../services/UserService';
import { COOKIE_NAME } from '../config';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 60;

export default Router().post('/', async (req: Request, res: Response) => {
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
});
