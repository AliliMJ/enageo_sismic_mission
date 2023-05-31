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

export const resourceFilter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const title = req.query.like;
  req.body.query = { titre: { $regex: title } };

  next();
};

export const usernameFilter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.query.like;

  req.body.filter = {
    username: { startsWith: username },
  };

  next();
};

export const enPanneMaterielFilter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const designation = req.query.like;

  req.body.filter = {
    designation: { startsWith: designation },
  };

  next();
};

export const goodMaterielFilter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const designation = req.query.like;

  req.body.filter = {
    designation: { startsWith: designation },
  };

  next();
};
