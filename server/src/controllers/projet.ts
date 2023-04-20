import { Response, Request } from 'express';

export const getProjets = async (req: Request, res: Response) => {
  try {
    const userid = req.body.id;

    const projets = await prisma.projet.findMany({
      where: {
        Executions: {
          some: {
            Equipe: { Mission: { Chefs: { some: { id: userid } } } },
          },
        },
      },
    });

    return res.status(200).json(projets);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection des projets' });
  }
};

export const getProjetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const projet: any = await prisma.projet.findUnique({
      where: { id: Number(id) },
    });
    const etat = await prisma.transition.findFirst({
      where: { projetId: projet?.id },
      orderBy: { date: 'desc' },
    });

    projet.etat = etat;

    return res.status(200).json(projet);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection de ce projet',
    });
  }
};

export const insertProjet = async (req: Request, res: Response) => {
  const { plan, clientId } = req.body;

  //plan [{objectifId:Int, valeur: String, debut:Date, duree:Date}]
  try {
    const projet = await prisma.projet.create({
      data: {
        clientId: clientId,
        Plan: { create: plan },
        Etats: { create: { etatProjetId: 1 } },
      },
    });
    res.status(201).json(projet);
  } catch (e) {
    res.status(500).json({
      err: 'Problème lors de la creation de ce projet',
    });
  }
};
