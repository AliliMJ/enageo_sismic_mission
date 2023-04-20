import { NextFunction, Request, Response } from 'express';

const employeNameFilter = (req: Request, res: Response, next: NextFunction) => {
  const nom = req.query.like;

  req.body.filter = {
    nom: { startsWith: nom },
  };

  next();
};

export default employeNameFilter;
