// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const { env } = process;
export const config = () => ({
  port: +env.PORT || 3000,
  prod: !!+env.PROD || false,
  database: {
    host: env.DB_HOST || 'localhost',
    port: +env.DB_PORT || 5432,
    user: env.DB_USER || 'postgres',
    password: env.DB_PASSWORD || 'postgres',
    database: env.POSTGRES_DB || 'car_rental',
  },
  rentPrice: 1000,
});
