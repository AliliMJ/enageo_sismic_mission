import { TypeEtatProjet } from '@prisma/client';
import { Response, Request } from 'express';

export const getProjets = async (req: Request, res: Response) => {
  try {
    const { userid } = req.body;

    const projets = await prisma.projet.findMany({
      where: {
        Mission: { Chefs: { some: { id: userid } } },
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
    const { id } = req.params;
    const projet: any = await prisma.projet.findUnique({
      where: { id: Number(id) },
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
  const { plan, contratId, userid } = req.body;

  //plan [{objectifId:Int, valeur: String, debut:Date, duree:Int}]
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
        contratNum: contratId,
        Plan: { create: plan },
        Etats: { create: { etat: TypeEtatProjet.PLANIFICATION } },
        missionCode: mission.code,
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
