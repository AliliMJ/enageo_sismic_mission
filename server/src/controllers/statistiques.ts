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

type CoutMonth = {
  years: String;
  cout: number;
};

export const getGestionnaireStatistiques = async (
  req: Request,
  res: Response
) => {
  try {
    const stat = {
      nbMaterielEnPanne: 0,
      nbMaterielEnReparation: 0,
      nbMaterielEnReparationExterne:0,
      nbMaterielBonEtat: 0,
      NbTotalMateriel: 0,
      pourcentageMateriel: 0,
      pourcentageMaterielWithExterne: 0,

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
      coutReparationByMonth : {},
      coutReparationExterneByMonth : {}
    };

    const codeMission = String(req.params.codeMission);

    stat.NbTotalMateriel = await prisma.materiel.count({
      where: {
        codeMission: codeMission,
      },
    });

    stat.nbMaterielBonEtat = await prisma.materiel.count({
      where: {
        codeMission: codeMission,
        status: 2,
      },
    });

    stat.nbMaterielEnReparation = await prisma.materiel.count({
      where: {
        codeMission: codeMission,
        status: 1,
      },
    });

    stat.nbMaterielEnReparationExterne = await prisma.materiel.count({
      where: {
        codeMission: codeMission,
        status: 3,
      },
    })

    stat.nbMaterielEnPanne = await prisma.materiel.count({
      where: {
        codeMission: codeMission,
        OR : [
          {
            status : 0
          },
          {
            status : 3
          }
        ]
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
      await prisma.$queryRaw`SELECT marque , count(*) as nbr FROM materiel WHERE codeMission=${codeMission} group by marque`;

    stat.nbMatMarque = rawNumberByMarque.map(({ marque, nbr }) => {
      return { marque, nbr: Number(nbr) };
    });

    const rawNumberByModele: Array<MaterielModeleType> =
      await prisma.$queryRaw`SELECT modele , count(*) as nbr FROM materiel WHERE codeMission=${codeMission} group by modele`;

    stat.nbMatModele = rawNumberByModele.map(({ modele, nbr }) => {
      return { modele, nbr: Number(nbr) };
    });

    const rawNumberByType: Array<MaterielTypeType> =
      await prisma.$queryRaw`select t.libelle as typeM , count(*) as nbr FROM 
      materiel m , typemateriel t
      where m.idTypeMat = t.idTypeMat AND
      m.codeMission = ${codeMission} GROUP BY t.idTypeMat`;

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
    stat.pourcentageMaterielWithExterne = Number(((stat.nbMaterielEnPanne+stat.nbMaterielEnReparation+stat.nbMaterielEnReparationExterne)/stat.NbTotalMateriel)*100);


    // const price = await prisma.$queryRaw`SELECT DATE_FORMAT(CURRENT_DATE - INTERVAL 1 MONTH, '%Y-%m-01') as months , sum(cout) as sum FROM sismicvision.reparation r , sismicvision.materiel m 
    // WHERE r.codeMat=m.codeMat AND
    //       m.codeMission='EGS120' AND
    //  DATE(dFinRep) >= DATE_ADD(LAST_DAY(DATE_SUB(NOW(), INTERVAL 2 MONTH)), INTERVAL 1 DAY)
    //    AND DATE(dFinRep) <= LAST_DAY(DATE_SUB(NOW(), INTERVAL 1 MONTH))`;

    //   // if(===null){
    //   //   console.log('null');
    //   // }else{
    //   //   console.log(price);
    //   // }

    const rawCoutByYears: Array<CoutMonth> =
      await prisma.$queryRaw`SELECT  DATE_FORMAT(r.dFinRep,'%Y-%m') as years , sum(r.cout) as cout 
      FROM reparationInterne r , materiel m
      WHERE r.codeMat=m.codeMat AND
            m.codeMission=${codeMission}
      GROUP BY  DATE_FORMAT(r.dFinRep,'%Y-%m')
      ORDER BY years `;

    stat.coutReparationByMonth = rawCoutByYears.map(({ years, cout }) => {
      return { years, cout: Number(cout) };
    });

    const rawCoutExterneByYears: Array<CoutMonth> =
      await prisma.$queryRaw`SELECT  DATE_FORMAT(dFinRep,'%Y-%m') as years , sum(cout) as cout 
      FROM reparationExterne r , materiel m
      WHERE r.codeMat=m.codeMat AND
            m.codeMission=${codeMission}
      GROUP BY  DATE_FORMAT(dFinRep,'%Y-%m')
      ORDER BY years `;

    stat.coutReparationExterneByMonth = rawCoutExterneByYears.map(({ years, cout }) => {
      return { years, cout: Number(cout) };
    });

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

type MaterielPannesType1 = {
  dPanne: String;
};

export const atelierStatistiques = async (req: Request, res: Response) => {
  try {

    const codeMission = String(req.params.codeMission);

    const stat = {
      nbPannesByMonth: {},
      nbPannesExterneByMonth: {},
      nbReparationInterneByMarque: {},
      nbReparationExterneByMarque: {},
      nbReparationInterneByMonth:{},
      nbReparationExterneByMonth:{},

    };

    await prisma.$queryRaw`SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`;
    
    const rawNumberByYears: Array<MaterielPannesType> =
      await prisma.$queryRaw`SELECT DATE_FORMAT(r.dPanne, '%m / %Y') AS dates , count(*) as nbr
    FROM reparationInterne r , materiel m 
    WHERE r.codeMat = m.codeMat AND
          m.codeMission = ${codeMission}
    GROUP BY MONTH(r.dPanne), YEAR(r.dPanne)
    ORDER BY dates`;

    stat.nbPannesByMonth = rawNumberByYears.map(({ dates, nbr }) => {
      return { dates, nbr: Number(nbr) };
    });

    //************************************* */
    const rawNumberExterneByYears: Array<MaterielPannesType> =
      await prisma.$queryRaw`SELECT DATE_FORMAT(r.dPanne, '%m / %Y') AS dates , count(*) as nbr
    FROM reparationExterne r , materiel m 
    WHERE r.codeMat = m.codeMat AND
          m.codeMission = ${codeMission}
    GROUP BY MONTH(r.dPanne), YEAR(r.dPanne)
    ORDER BY dates`;

    stat.nbPannesExterneByMonth = rawNumberExterneByYears.map(({ dates, nbr }) => {
      return { dates, nbr: Number(nbr) };
    });

    /* *************************************************** */

    const rawNumberInterneByMarque: Array<MaterielPannesMarque> =
      await prisma.$queryRaw`SELECT m.marque , count(r.idRep) as nbr FROM 
    reparationInterne r , materiel m 
    WHERE r.codeMat = m.codeMat AND
        m.codeMission = ${codeMission}
    GROUP BY m.marque`;

    stat.nbReparationInterneByMarque = rawNumberInterneByMarque.map(({ marque, nbr }) => {
      return { marque, nbr: Number(nbr) };
    });

    const rawNumberExterneByMarque: Array<MaterielPannesMarque> =
      await prisma.$queryRaw`SELECT m.marque , count(r.idRep) as nbr FROM 
    reparationExterne r , materiel m 
    WHERE r.codeMat = m.codeMat AND
        m.codeMission = ${codeMission}
    GROUP BY m.marque`;

    stat.nbReparationExterneByMarque = rawNumberExterneByMarque.map(({ marque, nbr }) => {
      return { marque, nbr: Number(nbr) };
    });



    /* ****************************************************** */

    const rawNumberInerneByMonths: Array<MaterielPannesType> =
      await prisma.$queryRaw`SELECT DATE_FORMAT(r.dFinRep, '%m / %Y') AS dates , count(*) as nbr
    FROM reparationInterne r , materiel m 
    WHERE r.codeMat = m.codeMat AND
          m.codeMission = ${codeMission}
    GROUP BY MONTH(r.dFinRep), YEAR(r.dFinRep)
    ORDER BY dates`;

    stat.nbReparationInterneByMonth = rawNumberInerneByMonths.map(({ dates, nbr }) => {
      return { dates, nbr: Number(nbr) };
    });

    /* ********************************************************* */

    const rawNumberExterneByMonths: Array<MaterielPannesType> =
      await prisma.$queryRaw`SELECT DATE_FORMAT(r.dPanne, '%m / %Y') AS dates , count(*) as nbr
    FROM reparationExterne r , materiel m 
    WHERE r.codeMat = m.codeMat AND
          m.codeMission = ${codeMission}
    GROUP BY MONTH(r.dPanne), YEAR(r.dPanne)
    ORDER BY dates`;

    stat.nbReparationExterneByMonth = rawNumberExterneByMonths.map(({ dates, nbr }) => {
      return { dates, nbr: Number(nbr) };
    });

    res.status(200).json(stat);
  } catch(e) {
    console.log(e);
    res
      .status(500)
      .json({ err: "Problème lors de la collection des atelier statistiques" });
  }
};