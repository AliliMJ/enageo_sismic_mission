import { Response, Request } from 'express';

export const getMaterial = async (req: Request, res: Response) => {
  try {
    const materials = await prisma.materiel.findMany({
      ...req.body.pagination?.options,
    });

    return res.status(200).json(materials);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection de matériel' });
  }
};

export const getMaterialTypes = async (req: Request, res: Response) => {
  try {
    const materialTypes = await prisma.typeMateriel.findMany();

    return res.status(200).json(materialTypes);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection de types du matériel' });
  }
};
