import { Role } from '@prisma/client';
import { verifyUserCredentials } from '../auth/auth.service';
import type { Request, Response, NextFunction } from 'express';

export const authenticate = async (
  //authentication middleware
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await verifyUserCredentials(email, password);
    if (user.valide) {
      req.body = user;
      return next();
    }
    res.status(401).send('User not validated');
  } catch {
    res.status(401).send('User not authenticated.');
  }
};

export const authorize = (roles: Role[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body;
    if (roles.length === 0) return next();

    if (role && roles.includes(role)) return next();

    res.status(401).send('User is unauthorised');
  };
};
