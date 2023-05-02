import { TypeEtatProjet } from '@prisma/client';
import { Response, Request } from 'express';

export const getProjets = async (req: Request, res: Response) => {
  try {
    const { userid } = req.body;

    const user = await prisma.compte.findFirst({
      where: { id: userid },
      select: { employe: { select: { codeMission: true } } },
    });

    if (!user?.employe?.codeMission)
      return res.status(401).json({ err: 'Mission not found' });
    const projets = await prisma.projet.findMany({
      where: {
        codeMission: user.employe.codeMission,
      },
      include: { Etats: true },
    });

    return res.status(200).json(projets);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection des projets' });
  }
};

export const getProjetById = async (req: Request, res: Response) => {
  try {
    const { idProjet } = req.params;
    const projet: any = await prisma.projet.findUnique({
      where: { idProjet: Number(idProjet) },
      include: { Etats: true },
    });

    return res.status(200).json(projet);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection de ce projet',
    });
  }
};

export const insertProjet = async (req: Request, res: Response) => {
  const {
    plan, //plan [{objectifId:Int, valeur: String, debut:Date, duree:Int}]
    userid,
    nom = '',
    description = '',
    budget = 100,
  } = req.body;

  try {
    const mission = await prisma.mission.findFirst({
      where: {
        Chefs: { some: { id: userid } },
      },
    });
    if (mission == null)
      return res
        .status(401)
        .json({ err: `Cet utilisateur n'a pas accès à cette mission` });
    const projet = await prisma.projet.create({
      data: {
        Plan: { create: plan },
        Etats: { create: { etat: TypeEtatProjet.PLANIFICATION } },
        codeMission: mission.codeMission,
        nom,
        description,
        budget,
      },
    });
    res.status(201).json(projet);
  } catch (e) {
    console.log(e);

    res.status(500).json({
      err: 'Problème lors de la creation de ce projet',
    });
  }
};
