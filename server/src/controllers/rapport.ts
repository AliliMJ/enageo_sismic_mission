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
const nomsDesMois = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

export const getProduction = async (req: Request, res: Response) => {
  try {
    const codeActivite = req.params.codeActivite;
    const rendements = await prisma.rendement.findMany({
      where: {
        Equipe: { codeActivite },
      },
      include: {
        Rapport: {
          include: {
            Projet: { include: { Terrain: { include: { Wilaya: true } } } },
          },
        },
      },
    });

    const production = rendements.map((r) => {
      const date = new Date(r.Rapport.date);
      const numMois = date.getMonth();

      const mois = nomsDesMois[numMois];
      const annee = date.getFullYear();
      return {
        chantier: r.Rapport.Projet.codeMission,
        wilaya: r.Rapport.Projet.Terrain?.Wilaya.nom,
        mois,
        annee,
        vp: r.valeur,
        gain: r.valeur * 30000, // à remplacer avec le prix de 1 vp dans le projet
      };
    });

    res.status(200).json(production);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des rapports' });
  }
};

export const getProductionByProject = async (req: Request, res: Response) => {
  try {
    const idProjet = Number(req.params.idProjet);

    const rendements = await prisma.rendement.findMany({
      where: {
        Equipe: { codeActivite: 'ENR' },
        Rapport: {
          idProjet,
        },
      },
      include: {
        Rapport: true,
      },
    });

    const production = rendements.map((r) => {
      const date = new Date(r.Rapport.date);
      const mois = date.getMonth();
      const jour = date.getDate();
      const annee = date.getFullYear();

      return {
        jour,
        mois,
        libMois: nomsDesMois[mois],
        annee,
        vp: r.valeur,
        gain: r.valeur * 30000, // à remplacer avec le prix de 1 vp dans le projet
      };
    });
    let groups = [];
    let lastGroup: any = null;
    for (let p of production) {
      if (lastGroup == null) {
        lastGroup = p;
        groups.push(lastGroup);
      } else if (
        p.jour == lastGroup.jour &&
        p.mois == lastGroup.mois &&
        p.annee == lastGroup.annee
      ) {
        lastGroup.vp += p.vp;
        lastGroup.gain += p.gain;
      } else {
        lastGroup = p;
        groups.push(lastGroup);
      }
    }
    console.log(groups);

    res.status(200).json(groups);
  } catch (e) {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des rapports' });
  }
};
