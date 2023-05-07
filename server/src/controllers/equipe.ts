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

export const getEquipeById = async (req: Request, res: Response) => {
  try {
    const idEquipe = Number(req.params.idEquipe);
    const equipe = await prisma.equipe.findUnique({ where: { idEquipe } });
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
        include: { activite: true },
      });
      res.status(200).json(equipes);
    } else {
      res.status(200).json([]);
    }
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection des equipes' });
  }
};
