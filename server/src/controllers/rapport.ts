import { Response, Request } from 'express';

export const getAllRapports = async (req: Request, res: Response) => {
  try {
    const rapports = await prisma.rapport.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter },
    });

    res.status(200).json(rapports);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des rapports' });
  }
};

export const getRapportById = async (req: Request, res: Response) => {
  try {
    const idRapport = Number(req.params.idRapport);
    const rapport = await prisma.rapport.findUnique({ where: { idRapport } });
    res.status(200).json(rapport);
  } catch {
    res.status(500).json({
      err: `Èchec lors de la collection du rapport ${req.params.idRapport}`,
    });
  }
};

export const getRapportsByProjet = async (req: Request, res: Response) => {
  const idProjet = req.body.idProjet;
  try {
    const rapports = prisma.rapport.findMany({ where: { idProjet } }) ?? [];
    res.status(200).json(rapports);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des rapports' });
  }
};

export const insertRapport = async (req: Request, res: Response) => {
  const { rendements } = req.body;
};
