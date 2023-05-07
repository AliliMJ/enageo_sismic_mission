import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.compte.findMany({
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
    const user = await prisma.compte.delete({ where: { id } });
    res.status(200).json(user);
  } catch {
    res.status(500).json({
      err: `Èchec lors de la suppression de l'utilisateur ${id}`,
    });
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const user = await prisma.compte.findUnique({ where: { username } });
    res.status(200).json(user);
  } catch {
    res.status(500).json({
      err: `Èchec lors de la collection de l'utilisateur ${req.params.username}`,
    });
  }
};

export const insertUser = async (req: Request, res: Response) => {
  const { username, role, employeId } = req.body;
  const dateCreationCompte = new Date();

  const hashPassword = await bcrypt.hash('123', 10);
  try {
    const user = await prisma.compte.create({
      data: {
        username,
        hashPassword,
        role,
        employeId,
        dateCreationCompte,
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
    const user = await prisma.compte.findUnique({
      where: { id: Number(id) },
    });
    if (user == null)
      return res.status(400).json({ err: 'Compte introuvable' });

    res.status(200).json(user);
  } catch {
    res.status(500).json({ err: `Problème lors de la recherche du compte` });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const id = Number(req.params.id);

    const user = await prisma.compte.update({ data, where: { id } });

    res.status(200).json(user);
  } catch {
    res.status(500).json({
      err: `Èchec lors de la mise à jour de données de l'utilisateur ${req.params.id}`,
    });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { role } = req.body;

  try {
    const id = Number(req.params.id);
    const user = await prisma.compte.update({
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

// les fonctions des statistiques

export const getUsersNumber = async (req: Request, res: Response) => {
  try {
    const stat = {
      nbUsers: 0,
      nbAdmins: 0,
      nbCMission: 0,
      NbCTerrain: 0,
      NbGestionnare: 0,
      nbDirecteur: 0,
      datesCreation: {
        annees: [],
      },
      nbUsersEmail: 0,
      nbEmployes: 0,
      nbEmployesEmail: 0,
    };

    stat.nbUsers = await prisma.compte.count();
    stat.nbAdmins = await prisma.compte.count({
      where: { role: 'ADMINISTRATEUR' },
    });
    stat.nbCMission = await prisma.compte.count({
      where: { role: 'CHEF_MISSION' },
    });
    stat.NbCTerrain = await prisma.compte.count({
      where: { role: 'CHEF_TERRAIN' },
    });
    stat.NbGestionnare = await prisma.compte.count({
      where: { role: 'GESTIONNAIRE' },
    });
    stat.nbDirecteur = await prisma.compte.count({
      where: { role: 'DIRECTEUR' },
    });
    stat.nbEmployes = await prisma.employe.count();
    const nbEmployesEmail = await prisma.employe.count({
      select: {
        email: true,
      },
    });

    stat.nbEmployesEmail = nbEmployesEmail.email;

    console.log(stat.nbEmployesEmail);

    return res.status(200).json(stat);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des statistiques' });
  }
};

type AccountGroup = {
  year: number;
  nbr: number;
};

export const getUsersNumberOfYear = async (req: Request, res: Response) => {
  try {
    const rawNumberByYears: Array<AccountGroup> =
      await prisma.$queryRaw`SELECT YEAR(dateCreationCompte) as year , count(*) as nbr
                             FROM compte group by YEAR(dateCreationCompte)`;

    // const accountCount: any =
    //   await prisma.$queryRaw`Select count(*) as nbr from Compte`;

    //  const annees =
    //   await prisma.compte.findMany({
    //     select : {
    //       dateCreationCompte : true
    //     }
    //   })

    // const anneesArray: any[] = [];

    // annees.forEach((element) => {
    //   anneesArray.push(element.dateCreationCompte.getFullYear()
    //   );
    // });

    const numberByYears = rawNumberByYears.map(({ year, nbr }) => {
      return { year, nbr: Number(nbr) };
    });

    // console.log(anneesArray);

    // const nombre = await prisma.compte.count({
    //   where : {
    //     dateCreationCompte : {gte : `01/01/`+annee , lte : `31/12/`+annee},

    //   }
    // });

    return res.status(200).json(numberByYears);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des statistiques' });
  }
};
