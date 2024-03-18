import dotenv from "dotenv";
dotenv.config();

interface Ienv {
  port: number | undefined;
  dbUrl: string | undefined;
  refreshTokenSecret: string | undefined;
  refreshTokenExpiresIn: string | undefined;
  accessTokenSecret: string | undefined;
  accessTokenExpiresIn: string | undefined;
  bcrypt: string | undefined;
}

const envConfig: Ienv = {
  port: parseInt(process.env.PORT || "5000", 10),
  dbUrl: process.env.DB_URL,
  refreshTokenSecret: process.env.refresh_token_secret,
  refreshTokenExpiresIn: process.env.refresh_token_expiresIn,
  accessTokenSecret: process.env.access_token_secret,
  accessTokenExpiresIn: process.env.access_token_expireIn,
  bcrypt: process.env.BCRYPT_SALT_ROUNDS,
};

export default envConfig;
