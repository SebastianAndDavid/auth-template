import { hash } from "bcrypt";
import { prisma } from "../utils/db.server";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { Users } from "@prisma/client";

type User = {
  email: string;
  password: string;
};

export default class UserService {
  static async signUpUser({ email, password }: User): Promise<[Users, string]> {
    const passwordHash = await hash(password, Number(process.env.SALT_ROUNDS));
    const user = await prisma.users.create({
      data: { email, password: passwordHash },
      select: { id: true, email: true, password: true },
    });

    const tokenPayLoad = { id: user.id, email: user.email };

    const token = sign(tokenPayLoad, JWT_SECRET || "defaultSecret", {
      expiresIn: "1 day",
    });
    return [user, token];
  }
}
