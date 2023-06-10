import { Response, Request } from 'express';

export const getAllEquipes = async (req: Request, res: Response) => {
  try {
    const equipes = await prisma.equipe.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter },
    });

    res.status(200).json(equipes);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection des equipes' });
  }
};

export const affecterEmployer = async (req: Request, res: Response) => {
  const { idEmploye, idEquipe } = req.body;
  try {
    const employe = await prisma.employe.findUnique({
      where: { id: idEmploye },
      select: { idEquipe: true },
    });
    if (employe == null)
      return res.status(401).json({ err: 'Employe introuvable' });
    if (employe?.idEquipe != null)
      return res
        .status(400)
        .json({ err: 'Cet employe est déja affecté dans une équipe' });
    const equipe = await prisma.employe.update({
      where: { id: idEmploye },
      data: {
        idEquipe,
      },
    });

    res.status(200).json(equipe);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection des equipes' });
  }
};

export const getEquipeById = async (req: Request, res: Response) => {
  try {
    const idEquipe = Number(req.params.idEquipe);
    const equipe = await prisma.equipe.findUnique({
      where: { idEquipe },
      include: { activite: true, Membres: true },
    });
    res.status(200).json(equipe);
  } catch {
    res.status(500).json({
      err: `Èchec lors de la collection de l'equipe ${req.params.idEquipe}`,
    });
  }
};

export const getEquipesByMission = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  try {
    const employe = await prisma.employe.findFirst({
      where: { compte: { id: userId } },
    });
    if (employe && employe.codeMission) {
      const equipes = await prisma.equipe.findMany({
        where: { Mission: { codeMission: employe.codeMission } },
        include: { activite: true, Membres: true },
      });
      res.status(200).json(equipes);
    } else {
      res.status(200).json([]);
    }
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection des equipes' });
  }
};

export const getEquipesByMission1 = async (req: Request, res: Response) => {
  try {
    const codeMission = req.params.codeMission;

    const equipes = await prisma.equipe.findMany({
      where: {
        codeMission: codeMission,
      },
    });
    res.status(200).json(equipes);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection des equipes' });
  }
};
