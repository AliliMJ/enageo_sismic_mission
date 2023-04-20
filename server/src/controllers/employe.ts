import { Response, Request } from 'express';

export const getEmployes = async (req: Request, res: Response) => {
  const value = req.query.like;
  console.log(value);
  try {
    const employes = await prisma.employe.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter },
    });

    res.status(200).json(employes);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des employés' });
  }
};

export const insertEmploye = async (req: Request, res: Response) => {
  const {
    nom,
    prenom,
    fonctionId,
    etatEmployeId,
    email,
    dateAdhesion,
    dateNaissance,
  } = req.body;
  try {
    const employe = await prisma.employe.create({
      data: {
        email,
        nom,
        prenom,
        fonctionId,
        etatEmployeId,
        dateAdhesion,
        dateNaissance,
      },
    });

    res.status(201).json(employe);
  } catch {
    res.status(500).json({ err: `Èchec lors de la creation de l'employe` });
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

export const getFonctions = async (req: Request, res: Response) => {
  try {
    const fonctions = await prisma.fonction.findMany();

    res.status(200).json(fonctions);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des fonctions' });
  }
};
