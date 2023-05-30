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
      include: { Etats: true, Rapports: true },
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
    idEmploye,
    nom = '',
    description = '',
    budget = 100,
  } = req.body;

  try {
    const employe = await prisma.employe.findUnique({
      where: { id: idEmploye },
    });

    if (!employe?.codeMission) {
      return res.status(401).json({
        err: `Cet utilisateur n'est pas autorisé à la creation des projets`,
      });
    }
    const projet = await prisma.projet.create({
      data: {
        Etats: { create: { etat: TypeEtatProjet.PLANIFICATION } },
        codeMission: employe.codeMission,
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


`;

    res.json(projects);
  } catch (e) {
    res.send({
      err: 'Problème lors de la collection des projets en productions',
    });
  }
};

export const getProjetEnCoursByMission = async (
  req: Request,
  res: Response
) => {
  try {
    const codeMission = String(req.params.codeMission);

    const projects = await prisma.$queryRaw`
  SELECT p.*, c.longitude, c.latitude
  FROM Projet p
  JOIN EtatProjet ep ON p.idProjet = ep.idProjet
  JOIN Terrain t ON p.terrainIdTerrain = t.idTerrain
  JOIN Coordonne c ON t.idTerrain = c.terrainIdTerrain
  WHERE ep.etat = 'EN_PRODUCTION'
  AND   p.codeMission=${codeMission}
       
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

export const updateProjet = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const idProjet = Number(req.params.idProjet);
    const project = await prisma.projet.update({
      where: { idProjet },
      data: {
        Etats: { create: data.createdStates },
        annule: data.annule,
      },
    });
    res.json(project);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      err: 'Problème lors de la mise à jour de ce projet',
    });
  }
};
