import { Response, Request } from 'express';

export const getReparations = async (req: Request, res: Response) => {
  try {
    const reparations = await prisma.reparation.findMany({
      ...req.body.pagination?.options,
    });

    return res.status(200).json(reparations);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des réparations' });
  }
};

export const getPannes = async (req: Request, res: Response) => {
  try {
    const pannes = await prisma.panne.findMany();

    return res.status(200).json(pannes);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection des pannes' });
  }
};

export const getReparationsByMaterialCode = async (
  req: Request,
  res: Response
) => {
  try {
    const { code } = req.params;
    const reparations = await prisma.reparation.findMany({
      where: { materielCode: code },
    });

    return res.status(200).json(reparations);
  } catch {
    res
      .status(500)
      .json({
        err: 'Problème lors de la collection des reparations pour ce matériel',
      });
  }
};
