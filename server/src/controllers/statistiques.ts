import { Response, Request } from "express";

type emplyeFonctionType = {
  fonction: String;
  nbr: number;
};

type MaterielMarqueType = {
  marque: String;
  nbr: number;
};

type MaterielModeleType = {
  modele: String;
  nbr: number;
};

type MaterielTypeType = {
  typeM: String;
  nbr: number;
};

type EmployeGroup = {
  year: number;
  nbr: number;
};

export const getGestionnaireStatistiques = async (
  req: Request,
  res: Response
) => {
  try {
    const stat = {
      nbMaterielEnPanne: 0,
      nbMaterielEnReparation: 0,
      nbMaterielBonEtat: 0,
      NbTotalMateriel: 0,
      pourcentageMateriel: 0,

      nbEmployes: 0,
      pourcentageEmployes: 0,
      nombreEmpEtat: [
        {
          etat: "en mission",
          nb: 0,
        },
        {
          etat: "en congé",
          nb: 0,
        },
        {
          etat: "maladie",
          nb: 0,
        },
        {
          etat: "sanctionné",
          nb: 0,
        },
      ],
      NbEmpFonction: {},
      nbMatMarque: {},
      nbMatModele: {},
      nbMatType: {},
      numberEmpByYears: {},
    };

    const codeMission = req.params.codeMission;

    const projet = await prisma.projet.findFirst({
      where: {
        codeMission: codeMission,
      },
    });

    stat.NbTotalMateriel = await prisma.materiel.count({
      where: {
        idProjet: projet?.idProjet,
      },
    });

    stat.nbMaterielBonEtat = await prisma.materiel.count({
      where: {
        idProjet: projet?.idProjet,
        status: 2,
      },
    });

    stat.nbMaterielEnReparation = await prisma.materiel.count({
      where: {
        idProjet: projet?.idProjet,
        status: 1,
      },
    });

    stat.nbMaterielEnPanne = await prisma.materiel.count({
      where: {
        idProjet: projet?.idProjet,
        status: 0,
      },
    });

    stat.nbEmployes = await prisma.employe.count({
      where: {
        codeMission: codeMission,
        NOT: {
          fonctionId: 1,
        },
      },
    });

    stat.nombreEmpEtat[0].nb = await prisma.employe.count({
      where: {
        etat: "mission",
        codeMission: codeMission,
        AND: [
          {
            NOT: {
              fonctionId: 4,
            },
          },
          {
            NOT: {
              fonctionId: 3,
            },
          },
          {
            NOT: {
              fonctionId: 1,
            },
          },
        ],
      },
    });

    stat.nombreEmpEtat[1].nb = await prisma.employe.count({
      where: {
        etat: "conge",
        codeMission: codeMission,
        AND: [
          {
            NOT: {
              fonctionId: 4,
            },
          },
          {
            NOT: {
              fonctionId: 3,
            },
          },
          {
            NOT: {
              fonctionId: 1,
            },
          },
        ],
      },
    });

    stat.nombreEmpEtat[2].nb = await prisma.employe.count({
      where: {
        etat: "maladie",
        codeMission: codeMission,
        AND: [
          {
            NOT: {
              fonctionId: 4,
            },
          },
          {
            NOT: {
              fonctionId: 3,
            },
          },
          {
            NOT: {
              fonctionId: 1,
            },
          },
        ],
      },
    });

    stat.nombreEmpEtat[3].nb = await prisma.employe.count({
      where: {
        etat: "sanctionne",
        codeMission: codeMission,
        AND: [
          {
            NOT: {
              fonctionId: 4,
            },
          },
          {
            NOT: {
              fonctionId: 3,
            },
          },
          {
            NOT: {
              fonctionId: 1,
            },
          },
        ],
      },
    });

    const rawNumberByFonction: Array<emplyeFonctionType> =
      await prisma.$queryRaw`SELECT f.nom as fonction , count(*) as nbr
      FROM employe e , fonction f where 
      e.fonctionId = f.idFonction AND
      codeMission=${codeMission} AND 
      fonctionId != 1 AND
      fonctionId != 3 AND
      fonctionId != 4
      group by fonctionId`;

    stat.NbEmpFonction = rawNumberByFonction.map(({ fonction, nbr }) => {
      return { fonction, nbr: Number(nbr) };
    });

    const rawNumberByMarque: Array<MaterielMarqueType> =
      await prisma.$queryRaw`SELECT marque , count(*) as nbr FROM materiel WHERE idProjet=${projet?.idProjet} group by marque`;

    stat.nbMatMarque = rawNumberByMarque.map(({ marque, nbr }) => {
      return { marque, nbr: Number(nbr) };
    });

    const rawNumberByModele: Array<MaterielModeleType> =
      await prisma.$queryRaw`SELECT modele , count(*) as nbr FROM materiel WHERE idProjet=${projet?.idProjet} group by modele`;

    stat.nbMatModele = rawNumberByModele.map(({ modele, nbr }) => {
      return { modele, nbr: Number(nbr) };
    });

    const rawNumberByType: Array<MaterielTypeType> =
      await prisma.$queryRaw`select t.libelle as typeM , count(*) as nbr FROM 
      materiel m , typemateriel t
      where m.idTypeMat = t.idTypeMat AND
      m.idProjet = ${projet?.idProjet} GROUP BY t.idTypeMat`;

    stat.nbMatType = rawNumberByType.map(({ typeM, nbr }) => {
      return { typeM, nbr: Number(nbr) };
    });

    const rawNumberByYears: Array<EmployeGroup> =
      await prisma.$queryRaw`SELECT YEAR(dateRejoint) as year , count(*) as nbr
                             FROM employe WHERE codeMission = ${codeMission} AND
                             fonctionId!=1
                             group by YEAR(dateRejoint) ORDER BY year ASC`;

    stat.numberEmpByYears = rawNumberByYears.map(({ year, nbr }) => {
      return { year, nbr: Number(nbr) };
    });

    stat.pourcentageMateriel = Number(((stat.nbMaterielEnPanne+stat.nbMaterielEnReparation)/stat.NbTotalMateriel)*100);
    stat.pourcentageEmployes = Number(((stat.nombreEmpEtat[1].nb+stat.nombreEmpEtat[2].nb)/stat.nbEmployes)*100);

    res.status(200).json(stat);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ err: "Problème lors de la collection des statistiques" });
  }
};



type MaterielPannesType = {
  dates: String;
  nbr: number;
};

type MaterielPannesMarque = {
  marque: String;
  nbr: number;
};

export const atelierStatistiques = async (req: Request, res: Response) => {
  try {
    const idProjet = Number(req.params.idProjet);

    const stat = {
      nbPannesByMonth: {},
      nbPannesByMarque: {},
    };

    await prisma.$queryRaw`SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`;
    const rawNumberByYears: Array<MaterielPannesType> =
      await prisma.$queryRaw`SELECT DATE_FORMAT(r.dPanne, '%m / %Y') AS dates , count(*) as nbr
    FROM reparation r , materiel m 
    WHERE r.codeMat = m.codeMat AND
          m.idProjet = ${idProjet}
    GROUP BY MONTH(r.dPanne), YEAR(r.dPanne)
    ORDER BY dates`;

    stat.nbPannesByMonth = rawNumberByYears.map(({ dates, nbr }) => {
      return { dates, nbr: Number(nbr) };
    });

    const rqwNumberByMarque: Array<MaterielPannesMarque> =
      await prisma.$queryRaw`SELECT m.marque , count(*) as nbr FROM 
    sismicvision.reparation r , sismicvision.materiel m 
    WHERE r.codeMat = m.codeMat AND
        m.idProjet = ${idProjet}
    GROUP BY m.marque`;

    stat.nbPannesByMarque = rqwNumberByMarque.map(({ marque, nbr }) => {
      return { marque, nbr: Number(nbr) };
    });

    res.status(200).json(stat);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de la collection des atelier statistiques" });
  }
};
