import { compareSync, hash } from 'bcrypt';
import { prisma } from '../utils/db.server';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import createHttpError from 'http-errors';
import { UserSelect } from '../types/user.interfaces';

type User = {
  email: string;
  password: string;
};

export default class UserService {
  static async signUpUser({
    email,
    password,
  }: User): Promise<[UserSelect, string]> {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });
    if (existingUser) throw createHttpError(409, 'Email already exists');
    const passwordHash = await hash(password, Number(process.env.SALT_ROUNDS));
    const user = await prisma.users.create({
      data: { email, password: passwordHash },
      select: { id: true, email: true },
    });

    const tokenPayLoad = { id: user.id, email: user.email };

    const token = sign(tokenPayLoad, JWT_SECRET, {
      expiresIn: '1 day',
    });
    return [user, token];
  }

  static async signInUser({ email, password }: User) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw createHttpError(404, 'User not found');
    if (!compareSync(password, user.password)) {
      throw createHttpError(401, 'Invalid password or username');
    }
    const token = sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1 day',
    });
    return [user, token];
  }
}
