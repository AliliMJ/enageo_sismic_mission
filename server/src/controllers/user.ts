import { NextFunction, Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.utilisateur.findMany({
      ...req.body.pagination?.options,
    });

    return res.status(200).json(users);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des utilisateurs' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log(id);
    const user = await prisma.utilisateur.findUnique({
      where: { id },
    });
    if (user == null)
      return res.status(400).json({ err: 'Utilisateur introuvable' });

    res.status(200).json(user);
  } catch {
    res
      .status(500)
      .json({ err: `Problème lors de la recherche de l'utilisateur` });
  }
};
