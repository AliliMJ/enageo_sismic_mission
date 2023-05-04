import { Response, Request } from 'express';

  export const getFonctionById = async (req: Request, res: Response) => {
    try {
      const idFonction = Number(req.params.idFonction);
      const fonction = await prisma.fonction.findUnique({ where: { idFonction } });
      res.status(200).json(fonction);
    } catch {
      res.status(500).json({
        err: `Èchec lors de la collection de la fonction ${req.params.idFonction}`,
      });
    }
  };

  export const getFonctions = async (req: Request, res: Response) => {
    try {
      const fonction = await prisma.fonction.findMany({
        ...req.body.pagination?.options,
        where: { ...req.body.filter },
      });
  
      res.status(200).json(fonction);
    } catch {
      res
        .status(500)
        .json({ err: 'Problème lors de la collection des fonctions' });
    }
  };