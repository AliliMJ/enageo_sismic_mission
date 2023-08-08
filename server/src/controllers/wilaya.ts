import { Response, Request } from 'express';

export const getWilayas = async (req: Request, res: Response) => {
  try {
    const wilaya = await prisma.wilaya.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter },
    });

    res.status(200).json(wilaya);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection des wilayas' });
  }
};

export const getWilayaByNum = async (req: Request, res: Response) => {
  try {
    const numWilaya = Number(req.params.numWilaya);
    const wilaya = await prisma.wilaya.findUnique({ where: { numWilaya } });
    res.status(200).json(wilaya);
  } catch {
    res.status(500).json({
      err: `Èchec lors de la collection de la wilaya ${req.params.numWilaya}`,
    });
  }
};
