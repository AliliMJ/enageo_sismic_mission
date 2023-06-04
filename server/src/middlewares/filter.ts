import { NextFunction, Request, Response, query } from 'express';

export const employeNameFilter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const nom = req.query.like;

  req.body.filter = {
    titre: { startsWith: nom },
  };

  next();
};

export const resourceFilter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const title = req.query.title;
  req.body.query = { title: { $regex: title, $options: 'i' } };

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
