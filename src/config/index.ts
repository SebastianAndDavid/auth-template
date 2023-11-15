import dotenv from 'dotenv';
dotenv.config();

// export const { SALT_ROUNDS } = process.env;
// export const { JWT_SECRET } = process.env;
export const JWT_SECRET: string = process.env.JWT_SECRET!;
//asserts COOKIE_NAME will always be defined and have a string value.
//caution when using ! the non-null operator.
export const COOKIE_NAME: string = process.env.COOKIE_NAME!;
