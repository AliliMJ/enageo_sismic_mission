import bcrypt from 'bcrypt';

import prisma from '../utils/prisma.ts';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
  const { employeId, role } = req.body;

  try {
    const employe = await prisma.employe.findFirst({
      where: { id: employeId },
    });

    if (employe == null)
      return res.status(401).json({ err: 'Employé est introuvble' });

    const user = await prisma.utilisateur.findFirst({ where: { employeId } }); // checks if that employe already has an account.
    if (user)
      return res.status(400).json({ err: 'Employé possède déja un compte' });

    const password = '123'; // randomly generated with a random function ex. cuid() or uuid()
    const hashPassword = await bcrypt.hash(password, 10);

    const registeredUser = await prisma.utilisateur.create({
      data: {
        email: employe.email,
        hashPassword,
        employeId,
        role,
      },
    });

    // send password the person with that email.

    res.status(201).json(registeredUser);
  } catch (e) {
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
