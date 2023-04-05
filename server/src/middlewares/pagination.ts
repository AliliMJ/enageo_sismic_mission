import { NextFunction, Request, Response } from 'express';

const paginate = (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const offset = (page - 1) * limit;

  const pagination = {
    page,
    limit,
    options: {
      skip: offset,
      take: limit,
    },
  };

  req.body.pagination = pagination;

  next();
};

export default paginate;
