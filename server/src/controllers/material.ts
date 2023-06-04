import { Response, Request } from "express";

export const getMaterial = async (req: Request, res: Response) => {
  try {
    const materials = await prisma.materiel.findMany({
      ...req.body.pagination?.options,
    });

    return res.status(200).json(materials);
  } catch {
    res.status(500).json({ err: "Problème lors de la collection de matériel" });
  }
};

export const getMaterialTypes = async (req: Request, res: Response) => {
  try {
    const materialTypes = await prisma.typeMateriel.findMany();

    return res.status(200).json(materialTypes);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de la collection de types du matériel" });
  }
};

export const deleteMateriel = async (req: Request, res: Response) => {
  try {

    const codeMat = req.params.codeMat;

    const materialTypes = await prisma.materiel.update({
      where : {codeMat : codeMat},
      data : {codeMission : null}
    });

    return res.status(200).json(materialTypes);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de la suppression du materiel" });
  }
};

export const getMaterialByCode = async (req: Request, res: Response) => {
  try {
    const { codeMat } = req.params;
    const material = await prisma.materiel.findFirst({ 
      where: { codeMat } ,
      include : {TypeMateriel : true}
    });

    return res.status(200).json(material);
  } catch {
    res.status(500).json({ err: "Problème lors de la collection ce matériel" });
  }
};

export const mettreEnPanne = async (req: Request, res: Response) => {
  try {
    const { codeMat } = req.params;
    const material = await prisma.materiel.findFirst({ where: { codeMat } });
    if (material == null)
      return res.status(401).json({ err: "Matériel introuvable" });
    if (material.status === 0)
      return res.status(400).json({ err: `Matériel est déja en panne` });

   const materielEnPanne = await prisma.materiel.update({
      where: { codeMat },
      data: { status : 0 },
    });

    const reparation = await prisma.reparationInterne.create({
        data : {
          codeMat : codeMat,
          dPanne : new Date(),
          cout : 0
        }
    });

    return res.status(200).json({materielEnPanne , reparation});

  } catch {
     res.status(500).json({ err: "Problème lors de la mettre en panne du matériel" });
  }
};

// export const demandeReparation = async (req: Request, res: Response) => {
//   try {
//     const { pannes, detail } = req.body;
//     const { codeMat } = req.params;

//     await prisma.reparation.create({
//       data: {
//         codeMat,
//         detailProbleme: detail,
//         Pannes: { create: pannes.map((p: number) => ({ id: p })) },
//       },
//     });

//     await prisma.materiel.update({
//       where: { codeMat },
//       data: { status : 0 },
//     });

//     return res.status(200).send(`Matériel ${codeMat} est mis en panne`);
//   } catch {
//     res.status(500).json({ err: "Problème lors de la collection ce matériel" });
//   }
// };

export const MettreEnReparation = async (req: Request, res: Response) => {
  try {

    const  codeMat  = req.params.codeMat;
    const idRep = Number(req.body.idRep);
    const dDebrep = req.body.dDebRep;

    const reparation = await prisma.reparationInterne.update({
      data: {
        codeMat : codeMat,
        dDebRep : dDebrep ,
      },
      where : {
        idRep : idRep
      }
    });

    const materiel = await prisma.materiel.update({
      where : {codeMat : codeMat},
      data : {
        status : 1
      }
    });

    return res.status(200).send(`Matériel ${codeMat} est mis en reparatiom`);
  } catch(e){
    console.log(e);
    res.status(500).json({ err: "Problème lors de la collection ce matériel" });
  }
};

// export const MettreEnReparationExterne = async (req: Request, res: Response) => {
//   try {

//     const  codeMat  = req.params.codeMat;
//     const idRep = Number(req.body.idRep);

//    const demande = await prisma.demadeReparation.create({
//     data : {
//       idRep : idRep
//     }
//    });

//    const reparation = await prisma.reparation.update({
//      where : {idRep : idRep},
//      data : {externe : 2} 
//    });

//     const materiel = await prisma.materiel.update({
//       where : {codeMat : codeMat},
//       data : {
//         status : 3
//       }
//     });

//     return res.status(200).send(`Matériel ${codeMat} est mis en reparation externe`);
//   } catch(e){
//     console.log(e);
//     res.status(500).json({ err: "Problème lors de la collection ce matériel" });
//   }
// };

export const mettreBonEtat = async (req: Request, res: Response) => {
  try {

    const  codeMat  = req.params.codeMat;
    const idRep = req.body.idRep;
    const dFinRep = req.body.dFinRep;
    const cout = Number(req.body.cout);
    const detailProbleme = req.body.detailProbleme;

    const reparation = await prisma.reparationInterne.update({
      data: {
        codeMat : codeMat,
        dFinRep : dFinRep,
        detailProbleme : detailProbleme,
        cout : cout
      },
      where : {
        idRep : idRep
      }
    });

    const materiel = await prisma.materiel.update({
      where : {codeMat : codeMat},
      data : {
        status : 2
      }
    });

    return res.status(200).send(`Matériel ${codeMat} est réparé`);
  } catch {
    res.status(500).json({ err: "Problème lors de la reparation de ce matériel" });
  }
};

export const mettreReparer = async (req: Request, res: Response) => {
  try {
    const { codeMat } = req.params;

    const material = await prisma.materiel.findFirst({ where: { codeMat } });
    if (material == null)
      return res.status(401).json({ err: "Matériel introuvable" });
    if (material.status === 2)
      return res.status(400).json({ err: `Matériel n'est pas en panne` });

    //selectionner la réparation la plus récente.

    await prisma.reparationInterne.updateMany({
      where: { dDebRep: null , codeMat : codeMat },
      data: { dFinRep: new Date() },
    });

    await prisma.materiel.update({
      where: { codeMat },
      data: { status: 2, },
    });

    return res.status(200).send(`Matériel ${codeMat} est réparé`);
  } catch {
    res.status(500).json({ err: "Problème lors de la collection ce matériel" });
  }
};

export const getMaterialByMission = async (req: Request, res: Response) => {
  const codeMission = String(req.params.codeMission);
  try {
    const materials = await prisma.materiel.findMany({
      where: {
        codeMission : codeMission
      },
    });

    return res.status(200).json(materials);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de la collection de matériel par mission" });
  }
};

export const getEnPanneMaterielByDesignation = async (
  req: Request,
  res: Response
) => {
  try {
    const codeMission = String(req.params.codeMission);

    const materielEnPanne = await prisma.materiel.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter, 
        OR :[{status : 0 } , {status : 1}], 
       codeMission : codeMission },
    });

    res.status(200).json(materielEnPanne);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      err: `Èchec lors de la collection de materiel en panne ${req.params.designation}`,
    });
  }
};

export const getMaterialEnPanneByMission = async (
  req: Request,
  res: Response
) => {
  const codeMission = String(req.params.codeMission);
  try {
    const materials = await prisma.materiel.findMany({
      where: {
        codeMission : codeMission,
        OR : [
          {
            status: 0,
          },
          {
            status: 1,
          },
          {
            status: 3,
          }
        ]
        
      },
    });

    return res.status(200).json(materials);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de la collection de matériel par mission" });
  }
};

export const getMaterialGoodByMission = async (req: Request, res: Response) => {
  const codeMission = String(req.params.codeMission);
  try {
    const materials = await prisma.materiel.findMany({
      where: {
        codeMission : codeMission,
        status: 2,
      },
    });

    return res.status(200).json(materials);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de la collection de matériel par mission" });
  }
};

export const getMaterialGoodByDesignation = async (req: Request,res: Response) => {
  try {
    const codeMission = req.params.codeMission;

    const materiels = await prisma.materiel.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter, status : 2 ,
     codeMission : codeMission,}
    });

    return res.status(200).json(materiels);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({
        err: "Problème lors de la collection des bonnes matériels par designation",
      });
  }
};

export const getMaterialEnPanneWithReparations = async (req: Request,res: Response) => {
  try {
    const codeMat = req.params.codeMat;

    const materiels = await prisma.materiel.findFirst({
      where : {
        codeMat : codeMat
      },
      include : {
        ReparationsInterne : true,
        ReparationsExterne : true 
      },
    });

    return res.status(200).json(materiels);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({
        err: "Problème lors de la collection des bonnes matériels par designation",
      });
  }
};

export const getMaterialByDesignation = async (req: Request,res: Response) => {
  try {
    const codeMission = String(req.params.codeMission);

    const materiels = await prisma.materiel.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter ,
      codeMission : codeMission,}
    });

    return res.status(200).json(materiels);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({
        err: "Problème lors de la collection des matériels par designation",
      });
  }
};

export const getMaterialByWithoutMission = async (req: Request,res: Response) => {
  try {

    const materiels = await prisma.materiel.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter ,
      codeMission: null,}
    });

    return res.status(200).json(materiels);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({
        err: "Problème lors de la collection des matériels non affecter au mission",
      });
  }
};

export const getMaterialByWithoutMissionDesignation = async (req: Request,res: Response) => {
  try {

    const materiels = await prisma.materiel.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter ,
        codeMission: null,}
    });

    return res.status(200).json(materiels);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({
        err: "Problème lors de la collection des matériels non affecter au mission",
      });
  }
};

export const getMaterialWithoutMission = async (req: Request,res: Response) => {
  try {
    
    const codeMission = String(req.params.codeMission);

    const materiels = await prisma.materiel.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter ,
        codeMission: null,}
    });

    return res.status(200).json(materiels);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({
        err: "Problème lors de la collection des matériels non affecter au mission",
      });
  }
};

export const ajouterMaterielToMission = async (req: Request,res: Response) => {
  try {
    const codeMission = String(req.params.codeMission);

    const codeMat = req.body.codeMat;

    console.log(codeMat);

    const materiel = await prisma.materiel.update({
      data : {codeMission : codeMission},
      where : {codeMat : codeMat}
    });

    return res.status(200).json(materiel);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({
        err: "Problème lors de la collection des matériels non affecter au mission",
      });
  }
};

export const updateMateriel = async (req: Request,res: Response) => {
  try {
    
    const material = req.body.materiel;

    console.log(material);

    // const materiel = await prisma.materiel.update({
    //   data : {material},
    //   where : {material.codeMat}
    // });

    return res.status(200).json(1);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({
        err: "Problème lors de la collection des matériels non affecter au mission",
      });
  }
};

export const getMaterielReparationExterne = async (req: Request,res: Response) => {
  try {
    
    const codeMission = req.params.codeMission;

    const materiel = await prisma.materiel.findMany({
      where : {status : 3 , codeMission : codeMission}
    });

    return res.status(200).json(materiel);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({
        err: "Problème lors de la collection des matériels en reparation externe au mission",
      });
  }
};
