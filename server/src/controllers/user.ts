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

export const insertUser = async (req: Request, res: Response) => {

  const password = '123'; // randomly generated with a random function ex. cuid() or uuid()
  const hashPassword = await bcrypt.hash(password, 10);

  const {
    role,
    employeId,
  } = req.body;

  try {
    const employe = await prisma.employe.findFirst({
      where: { id: employeId },
    });

    if (employe == null)
      return res.status(401).json({ err: 'Employé est introuvble' });

    const user = await prisma.utilisateur.findFirst({ where: { employeId } }); // checks if that employe already has an account.
    if (user)
      return res.status(400).json({ err: 'Employé possède déja un compte' });

    const user1 = await prisma.utilisateur.create({
      data : {
          email : employe.email,
          hashPassword,
          role,
          employeId,
      },
    });

    // send password the person with that email.

    res.status(201).json(user1);
  } catch (e) {
    return res.status(500).send({ err: 'Inscription échouée' });
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
