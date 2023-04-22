import { NextFunction, Request, Response } from 'express';

export const employeNameFilter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const nom = req.query.like;

  req.body.filter = {
    nom: { startsWith: nom },
  };

  next();
};

export const userEmailFilter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.query.like;

  req.body.filter = {
    email: { startsWith: email },
  };

  next();
};
