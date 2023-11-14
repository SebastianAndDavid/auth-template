import dotenv from 'dotenv';
dotenv.config();

// export const { SALT_ROUNDS } = process.env;
export const { JWT_SECRET } = process.env;
export const { COOKIE_NAME } = process.env;
