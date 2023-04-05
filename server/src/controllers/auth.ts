import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

import prisma from '../utils/prisma.ts';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, employeId } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const registeredUser = await prisma.utilisateur.create({
      data: {
        email,
        hashPassword,
        employeId,
      },
    });

    res.status(201).json(registeredUser);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log();
      if (e.code === 'P2002')
        return res.status(500).send({ err: 'Email déja utilisé' });
      if (e.code === 'P2003')
        return res.status(500).send({ err: 'Code employé incorrect' });
    }

    return res.status(500).send({ err: 'Inscription échouée' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.utilisateur.findUnique({ where: { email } });
    if (user === null)
      return res.status(401).json({ err: 'Utilisateur introuvable' });
    else if (await bcrypt.compare(password, user.hashPassword)) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ err: 'Le mot de passe est incorrect' });
    }
  } catch {
    res.status(500).json({ err: 'Identification échouée' });
  }
};
