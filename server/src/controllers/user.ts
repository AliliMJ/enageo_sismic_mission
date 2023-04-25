import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.utilisateur.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter },
    });

    return res.status(200).json(users);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des utilisateurs' });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const id = Number(req.params.id);
    const user = await prisma.utilisateur.delete({ where: { id } });
    res.status(200).json(user);
  } catch {
    res.status(500).json({
      err: `Èchec lors de la suppression de l'utilisateur ${id}`,
    });
  }
};

export const getEmployeById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const employe = await prisma.employe.findUnique({ where: { id } });
    res.status(200).json(employe);
  } catch {
    res.status(500).json({
      err: `Èchec lors de la collection de l'employe ${req.params.id}`,
    });
  }
};

export const insertUser = async (req: Request, res: Response) => {
  const { email, role, employeId } = req.body;
  const hashPassword = await bcrypt.hash('123', 10);
  try {
    const user = await prisma.utilisateur.create({
      data: {
        email,
        hashPassword,
        role,
        employeId,
      },
    });

    res.status(201).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: `Èchec lors de la creation de utilisateur` });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.utilisateur.findUnique({
      where: { id: Number(id) },
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

export const updateUserRole = async (req: Request, res: Response) => {
  const { role } = req.body;

  try {
    const id = Number(req.params.id);
    const user = await prisma.utilisateur.update({
      data: { role },
      where: { id },
    });
    res.status(200).json(user);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2025'
    ) {
      return res.status(400).json({
        err: `Utilisateur ${req.params.id} introuvable`,
      });
    }
    res.status(500).json({
      err: `Problème lors de la mise à jour du role de l'utilisateur ${req.params.id} à ${role}`,
    });
  }
};
