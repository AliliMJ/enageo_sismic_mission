import { Request, Response } from 'express';

export const getEmps = async (req: Request, res: Response) => {
  try {
    const emps = await prisma.employe.findMany({
      ...req.body.pagination?.options,
    });

    return res.status(200).json(emps);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des employees' });
  }
};

export const getEmpById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const emp = await prisma.employe.findUnique({
      where: { id },
    });
    if (emp == null)
      return res.status(400).json({ err: 'employe introuvable' });

    res.status(200).json(emp);
  } catch {
    res.status(500).json({ err: `Problème lors de la recherche de l'employe` });
  }
};
