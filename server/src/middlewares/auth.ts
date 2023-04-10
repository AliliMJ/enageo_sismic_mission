import { Role } from '@prisma/client';

import type { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import bcrypt from 'bcrypt';

export const verifyUserAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, hashPassword } = req.body;

  try {
    const user = await prisma.utilisateur.findFirst({
      where: { email, hashPassword },
    });
    if (user === null)
      return res.status(401).json({ err: 'Utilisateur non authentifié.' });

    req.body = user;
    return next();
  } catch {
    res.status(500).json({ err: `Problème d'authentification.` });
  }
};

export const verifyUserAcces = (roles: Role[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body;
    if (roles.length === 0) return next();

    if (role && roles.includes(role)) return next();

    res.status(401).send('Accès refusé');
  };
};
