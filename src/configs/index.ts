// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const { env } = process;
export const config = () => ({
  host: env.HOST || 'localhost',
  port: +env.PORT || 3000,
  prod: !!+env.PROD || false,
  database: {
    host: env.DB_HOST || 'localhost',
    port: env.DB_PORT || 3306,
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'root',
    database: 'car_rental',
  },
  secretKey: env.SECRET_KEY,
});
