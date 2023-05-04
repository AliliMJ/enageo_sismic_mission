import { Response, Request } from 'express';

export const getEquipes = async (req: Request, res: Response) => {

    try {
      const equipes = await prisma.equipe.findMany({
        ...req.body.pagination?.options,
        where: { ...req.body.filter },
      });
  
      res.status(200).json(equipes);
    } catch {
      res
        .status(500)
        .json({ err: 'Problème lors de la collection des equipes' });
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