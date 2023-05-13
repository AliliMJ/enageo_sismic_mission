import bcrypt, { hash } from 'bcrypt';

import prisma from '../utils/prisma.ts';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
  const { employeId, username, role } = req.body;

  try {
    const employe = await prisma.employe.findFirst({
      where: { id: employeId },
    });

    if (employe == null)
      return res.status(401).json({ err: 'Employé est introuvble' });

    const user = await prisma.compte.findFirst({ where: { employeId } }); // checks if that employe already has an account.
    if (user)
      return res.status(400).json({ err: 'Employé possède déja un compte' });

    const password = '123'; // randomly generated with a random function ex. cuid() or uuid()
    const hashPassword = await bcrypt.hash(password, 10);

    const registeredUser = await prisma.compte.create({
      data: {
        username,
        hashPassword,
        employeId,
        role,
        dateCreationCompte: new Date(),
      },
    });

    // send password the person with that email.

    res.status(201).json(registeredUser);
  } catch (e) {
    return res.status(500).send({ err: 'Inscription échouée' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.compte.findUnique({ where: { username } });
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

export const verifyPassword = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.compte.findUnique({ where: { username } });

    if (user === null){
      return res.status(401).json({ err: 'Utilisateur introuvable' });
    }else if(await bcrypt.compare(password, user.hashPassword)){
      res.status(200).json({response : 1});
    }else {
      res.status(400).json({response : 0});
    }


  } catch {
    res.status(500).json({ err: 'Identification échouée' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
   const { username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.compte.update({
     where: { username : username },
     data : { hashPassword : hashPassword}, 
    });
    res.status(200).json(user);
  } catch {
    res.status(500).json({ err: 'Identification échouée' });
  }
};


