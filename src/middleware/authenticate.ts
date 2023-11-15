import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { COOKIE_NAME, JWT_SECRET } from '../config';
import createHttpError from 'http-errors';
import { UserSelect } from '../types/user.interfaces';

declare module 'express' {
  interface Request {
    user?: UserSelect;
  }
}

export default (req: Request, res: Response, next?: NextFunction) => {
  try {
    const cookie = req.cookies && req.cookies[COOKIE_NAME];
    if (!cookie) createHttpError(404, 'Must be signed in to continue');

    const user = verify(cookie, JWT_SECRET) as UserSelect;

    if (user) {
      req.user = user;
      if (next) {
        next();
      }
    } else {
      throw createHttpError(401, 'Unauthorized');
    }
  } catch (error) {}
  if (next) {
    next();
  }
};
