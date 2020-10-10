import { RequestHandler, Request, Response, NextFunction } from 'express';

export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
