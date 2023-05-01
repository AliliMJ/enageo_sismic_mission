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

export const getMaterialByCode = async (req: Request, res: Response) => {
  try {
    const { codeMat } = req.params;
    const material = await prisma.materiel.findFirst({ where: { codeMat } });

    return res.status(200).json(material);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection ce matériel' });
  }
};
export const mettreEnPanne = async (req: Request, res: Response) => {
  try {
    const { codeMat } = req.params;
    const material = await prisma.materiel.findFirst({ where: { codeMat } });
    if (material == null)
      return res.status(401).json({ err: 'Matériel introuvable' });
    if (material.enPanne)
      return res.status(400).json({ err: `Matériel est déja en panne` });

    await prisma.materiel.update({
      where: { codeMat },
      data: { enPanne: true },
    });
  } catch {}
};
export const demandeReparation = async (req: Request, res: Response) => {
  try {
    const { pannes, detail } = req.body;
    const { codeMat } = req.params;

    await prisma.reparation.create({
      data: {
        codeMat,
        detailProbleme: detail,
        Pannes: { create: pannes.map((p: number) => ({ id: p })) },
      },
    });

    await prisma.materiel.update({
      where: { codeMat },
      data: { enPanne: true },
    });

    return res.status(200).send(`Matériel ${codeMat} est mis en panne`);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection ce matériel' });
  }
};

export const reparer = async (req: Request, res: Response) => {
  try {
    const { codeMat } = req.params;

    const material = await prisma.materiel.findFirst({ where: { codeMat } });
    if (material == null)
      return res.status(401).json({ err: 'Matériel introuvable' });
    if (!material.enPanne)
      return res.status(400).json({ err: `Matériel n'est pas en panne` });

    //selectionner la réparation la plus récente.

    await prisma.reparation.updateMany({
      where: { dRep: null },
      data: { dRep: new Date() },
    });

    await prisma.materiel.update({
      where: { codeMat },
      data: { enPanne: false },
    });

    return res.status(200).send(`Matériel ${codeMat} est réparé`);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection ce matériel' });
  }
};
