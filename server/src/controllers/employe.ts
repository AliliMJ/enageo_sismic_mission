import { Response, Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

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
      .json({ err: "Problème lors de la collection des employés" });
  }
};

export const getAccountedEmployes = async (req: Request, res: Response) => {
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
      .json({ err: "Problème lors de la collection des employés" });
  }
};

export const insertEmploye = async (req: Request, res: Response) => {
  const {
    nom,
    prenom,
    dateRejoint,
    dateNaissance,
    lieuNaissance,
    email,
    numTel,
    adresse,
    sexe,
    numIdentite,
    groupeSanguin,
    regimTravail,
    codeMission,
    etat,
    fonctionId,
    idEquipe,
  } = req.body;
  try {
    const employe = await prisma.employe.create({
      data: {
        nom,
        prenom,
        dateRejoint,
        dateNaissance,
        lieuNaissance,
        email,
        numTel,
        adresse,
        sexe,
        numIdentite,
        groupeSanguin,
        regimTravail,
        codeMission,
        etat,
        fonctionId,
        idEquipe,
      },
    });

    res.status(201).json(employe);
  } catch(e) {
    console.log(e);
    res.status(500).json({ err: `Èchec lors de la creation de l'employe` });
  }
};

export const getEmployeById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const employe = await prisma.employe.findUnique({
      where: { id },
      include: { Equipe: true, Mission: true, fonction: true },
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
      .json({ err: "Problème lors de la collection des fonctions" });
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

type EmployeGroup = {
  year: number;
  nbr: number;
};

export const getEmployesNumberOfYear = async (req: Request, res: Response) => {
  try {
    const rawNumberByYears: Array<EmployeGroup> =
      await prisma.$queryRaw`SELECT YEAR(dateRejoint) as year , count(*) as nbr
                             FROM employe group by YEAR(dateRejoint) ORDER BY year ASC`;

    const numberByYears = rawNumberByYears.map(({ year, nbr }) => {
      return { year, nbr: Number(nbr) };
    });

    return res.status(200).json(numberByYears);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({
        err: "Problème lors de la collection des statistiques des employes",
      });
  }
};

export const getEmployeByMission = async (req: Request, res: Response) => {
  try {
    const codeMission = req.params.codeMission;

    const employe = await prisma.employe.findMany({
      where: {
        codeMission: codeMission,
        NOT: {
          fonctionId: 1,
        },
      },
      include: { Equipe: true, Mission: true, fonction: true },
    });
    res.status(200).json(employe);
  } catch {
    res.status(500).json({
      err: `Èchec lors de la collection de l'employe ${req.params.id}`,
    });
  }
};

export const deleteEmployeWithRemoveMission = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const employe = await prisma.employe.update({
      where: { id: id },
      data: {
        codeMission: null,
      },
    });

    res.status(200).json(employe);
  } catch {
    res.status(500).json({
      err: `Èchec lors de la collection de l'employe ${req.params.id}`,
    });
  }
};

export const getEmployesBymissionByName = async (
  req: Request,
  res: Response
) => {
  try {
    const codeMission = req.params.codeMission;
    const employes = await prisma.employe.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter, codeMission: codeMission },
    });

    res.status(200).json(employes);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de la collection des employés" });
  }
};

export const getEmployesWithOutMission = async (
  req: Request,
  res: Response
) => {
  try {
    const employes = await prisma.employe.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter, codeMission: null },
    });

    res.status(200).json(employes);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de la collection des employés" });
  }
};

export const insertEmployeWithMission = async (req: Request, res: Response) => {
  try {
    const codeMission = req.body.codeMission;
    const id = Number(req.params.id);

    const employe = await prisma.employe.update({
      where: {
        id: id,
      },
      data: {
        codeMission: codeMission,
      },
    });

    return res.status(200).json(employe);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ err: "Problème lors de la affecte du employe a une mission" });
  }
};

export const updateEmployeEquipe = async (req: Request, res: Response) => {
  try {
    const idEquipe = Number(req.body.idEquipe);
    const id = Number(req.params.id);

    const employe = await prisma.employe.update({
      where: {
        id: id,
      },
      data: {
        idEquipe: idEquipe,
      },
    });

    return res.status(200).json(employe);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ err: "Problème lors de la affecte du employe a une mission" });
  }
};
