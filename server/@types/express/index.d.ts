import { Express } from 'express';
import { IUser } from '../../src/models/userModel';

declare global {
  namespace Express {
    export interface Request {
      session: Express.Session & { user: IUser };
    }
  }
}
