import { Response, Request } from 'express';

export const getEmployes = async (req: Request, res: Response) => {
  // const value = req.query.like;
  // console.log(value);
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
    email,
    fonctionId,
    etatEmployeId,
    dateRejoint,
    dateNaissance,
    lieuNaissance,
    numTel,
    sexe,
    groupeSanguin,
    numIdentite,
    codeMission,
    adresse,
  } = req.body;
  try {
    const employe = await prisma.employe.create({
      data: {
        nom,
        prenom,
        email,
        fonctionId,
        etatEmployeId,
        dateRejoint,
        dateNaissance,
        sexe,
        numIdentite,
        groupeSanguin,
        numTel,
        lieuNaissance,
        codeMission,
        adresse,
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
    const employe = await prisma.employe.findUnique({
      where: { id },
      include: { Equipe: true },
    });
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

export const updateEmploye = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const id = Number(req.params.id);

    const employe = await prisma.employe.update({ data, where: { id } });

    res.status(200).json(employe);
  } catch {
    res.status(500).json({
      err: `Èchec lors de la mise à jour de données de l'employe ${req.params.id}`,
    });
  }
};

export const deleteEmploye = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const employe = await prisma.employe.delete({ where: { id } });
    res.status(200).json(employe);
  } catch {
    res.status(500).json({
      err: `Èchec lors de la suppression de l'employe ${req.params.id}`,
    });
  }
};
