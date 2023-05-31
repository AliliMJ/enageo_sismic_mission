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
    const rapport = await prisma.rapport.findUnique({
      where: { idRapport },
      include: { Rendements: { include: { Equipe: true } } },
    });
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
  const { rendements, idProjet, resume, titre } = req.body;

  try {
    const projet = await prisma.projet.findUnique({
      where: { idProjet: Number(idProjet) },
      select: { Mission: { select: { Equipes: true } } },
    });

    if (projet) {
      const rapport = await prisma.rapport.create({
        data: {
          date: new Date(),
          titre,
          resume,
          Projet: {
            connect: { idProjet: Number(idProjet) },
          },
          Rendements: {
            create: rendements.map((r: any) => {
              const equipe = projet.Mission.Equipes.filter(
                (e) => e.codeActivite === r.activite
              );
              console.log(equipe);
              return {
                idEquipe: equipe[0].idEquipe,
                hDebut: r.hDebut,
                hFin: r.hFin,
                valeur: r.valeur,
              };
            }),
          },
        },
      });
      return res.status(201).json(rapport);
    } else {
      return res
        .status(400)
        .json({ err: 'Prolème lors de la création du rapport' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: 'Internal error while creating report' });
  }
};
