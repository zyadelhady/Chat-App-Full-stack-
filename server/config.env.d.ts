declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    DATABASE: string;
    DATABASE_PASSWORD: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_PASSWORD: string;
    SECRET: string;
    COOKIE_EXPIRES_IN: string;
  }
}
