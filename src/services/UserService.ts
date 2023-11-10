import { prisma } from "../utils/db.server";

type User = {
  email: string;
  password: string;
};

export default class UserService {
  static async signUpUser({ email, password }: User): Promise<User> {
    // const passwordHash = await
  }
}
