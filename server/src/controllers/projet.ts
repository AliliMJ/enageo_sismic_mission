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
      include: { Etats: true, Rapprots: true },
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
    coordinates, //plan [{objectifId:Int, valeur: String, debut:Date, duree:Int}]
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
        Etats: { create: { etat: TypeEtatProjet.PLANIFICATION } },
        codeMission: mission.codeMission,
        nom,
        description,
        budget,
      },
    });
    await prisma.terrain.create({
      data: {
        Coordonnes: { create: coordinates },
        numWilaya: 1,
        Projet: { connect: { idProjet: projet.idProjet } },
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

export const getProjetByMission = async (req: Request, res: Response) => {
  const codeMission = req.params.missionCode;

  try {
    const projet = await prisma.projet.findFirst({
      where: { codeMission: codeMission },
      include: { Etats: true },
    });

    return res.status(200).json(projet);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection de ce projet',
    });
  }
};

export const getProjetsEnCours = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.$queryRaw`
  SELECT p.*, c.longitude, c.latitude
  FROM Projet p
  JOIN EtatProjet ep ON p.idProjet = ep.idProjet
  JOIN Terrain t ON p.terrainIdTerrain = t.idTerrain
  JOIN Coordonne c ON t.idTerrain = c.terrainIdTerrain
  WHERE ep.etat = 'EN_PRODUCTION'
    AND ep.id = (
      SELECT MAX(ep2.id)
      FROM EtatProjet ep2
      WHERE ep2.idProjet = p.idProjet
    )

LIMIT 1;
`;

    console.log(projects);
    res.json(projects);
  } catch (e) {
    res.send(e);
  }
};
export const getProjetByMissionWithEvenements = async (
  req: Request,
  res: Response
) => {
  const codeMission = req.params.missionCode;

  try {
    const projet = await prisma.projet.findFirst({
      where: { codeMission: codeMission },
      include: {
        Etats: true,
        Evenements: {
          orderBy: {
            id: 'desc',
          },
        },
      },
    });

    return res.status(200).json(projet);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection de ce projet',
    });
  }
};
