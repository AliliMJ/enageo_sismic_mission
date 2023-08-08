import { Response, Request } from 'express';

export const getReparationsInterne = async (req: Request, res: Response) => {
  try {
    const reparations = await prisma.reparationInterne.findMany({
      ...req.body.pagination?.options,
    });

    return res.status(200).json(reparations);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des réparations' });
  }
};

//pas de route
export const getReparationsExterne = async (req: Request, res: Response) => {
  try {
    const reparations = await prisma.reparationInterne.findMany({
      ...req.body.pagination?.options,
    });

    return res.status(200).json(reparations);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des réparations' });
  }
};

export const getReparationsInterneByMaterialCode = async (
  req: Request,
  res: Response
) => {
  try {
    const codeMat = req.params.codeMat;

    const reparations = await prisma.reparationInterne.findMany({
      where: { codeMat: codeMat },
      orderBy: {
        dPanne: 'asc',
      },
    });

    return res.status(200).json(reparations);
  } catch (e) {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const getReparationsExterneByMaterialCode = async (
  req: Request,
  res: Response
) => {
  try {
    const codeMat = req.params.codeMat;

    const reparations = await prisma.reparationExterne.findMany({
      where: { codeMat: codeMat },
      orderBy: {
        dPanne: 'asc',
      },
    });

    return res.status(200).json(reparations);
  } catch (e) {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const getLastReparationInterneByMaterialCode = async (
  req: Request,
  res: Response
) => {
  try {
    const codeMat = req.params.codeMat;
    const reparations = await prisma.reparationInterne.findFirst({
      where: { codeMat: codeMat, dFinRep: null },
    });

    return res.status(200).json(reparations);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const getLastReparationExterneByMaterialCode = async (
  req: Request,
  res: Response
) => {
  try {
    const codeMat = req.params.codeMat;
    const reparations = await prisma.reparationExterne.findFirst({
      where: { codeMat: codeMat, dEntree: null },
    });

    return res.status(200).json(reparations);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const getLastReparationInterneByMaterialCode1 = async (
  req: Request,
  res: Response
) => {
  try {
    const codeMat = req.params.codeMat;
    const reparations = await prisma.reparationInterne.findMany({
      where: { codeMat: codeMat },
      orderBy: {
        dPanne: 'asc',
      },
    });

    return res.status(200).json(reparations[reparations.length - 1]);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

// export const getLastReparationByMaterialCodeWithDemande = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const codeMat = req.params.codeMat;
//     const reparations = await prisma.reparationInterne.findMany({
//       where: { codeMat: codeMat , externe : 2  },
//       orderBy: {
//         dPanne: 'asc',
//       },
//     });

//     return res.status(200).json(reparations[reparations.length - 1]);
//   } catch {
//     res.status(500).json({
//       err: 'Problème lors de la collection des reparations pour ce matériel',
//     });
//   }
// };

export const getAtelierMecanique = async (req: Request, res: Response) => {
  try {
    const materielEnPanne = await prisma.materiel.findMany({
      where: { OR: [{ status: 0 }, { status: 1 }] },
      orderBy: {
        codeMat: 'asc',
      },
    });

    const reparations = await prisma.reparationInterne.findMany({
      where: { dDebRep: null },
      orderBy: {
        codeMat: 'asc',
      },
    });

    // let reparations = <any>[];
    // materielEnPanne.forEach(async (element) => {
    //    reparations = await prisma.reparation.findMany({
    //     where: { codeMat : element.codeMat },
    //     orderBy: {
    //     dPanne : 'asc',
    //   },
    //   });

    //  });

    // let i=0;
    // const reparations = [];

    // for(i=0;i<materielEnPanne.length;i++){
    //   reparations.push(await prisma.reparation.findMany({
    //     where: { codeMat : materielEnPanne[i].codeMat , dDebRep : null  },
    //   }));
    // }

    type TypeAtelier = {
      codeMat: String;
      designation: String;
      matricule: String;
      status: Number;
      dPanne: Date | null;
      dDebRep: Date | null;
      dFinRep: Date | null;
    };

    const atelier = [];

    let i = 0;
    for (i = 0; i < materielEnPanne.length; i++) {
      const vard: TypeAtelier = {
        codeMat: materielEnPanne[i].codeMat,
        designation: materielEnPanne[i].designation,
        matricule: materielEnPanne[i].matricule,
        status: materielEnPanne[i].status,
        dPanne: reparations[i].dPanne,
        dDebRep: reparations[i].dDebRep,
        dFinRep: reparations[i].dFinRep,
      };

      atelier.push(vard);
    }

    return res.status(200).json({ atelier });
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const getReparationInterneById = async (req: Request, res: Response) => {
  try {
    const idRep = Number(req.params.idRep);

    const reparation = await prisma.reparationInterne.findUnique({
      where: { idRep: idRep },
    });

    return res.status(200).json(reparation);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

/* start demande travail */

export const updateReparationExternedSortie = async (
  req: Request,
  res: Response
) => {
  try {
    const idRep = Number(req.params.idRep);
    const dSortie = req.body.dSortie;

    const demandereparation = await prisma.reparationExterne.update({
      data: { dSortie: dSortie },
      where: { idRep: idRep },
    });

    return res.status(200).json(demandereparation);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const updateReparationExternedArrive = async (
  req: Request,
  res: Response
) => {
  try {
    const idRep = Number(req.params.idRep);
    const dArrive = req.body.dArrive;

    const demandereparation = await prisma.reparationExterne.update({
      data: { dArrive: dArrive },
      where: { idRep: idRep },
    });

    return res.status(200).json(demandereparation);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const updateReparationExternedRetour = async (
  req: Request,
  res: Response
) => {
  try {
    const idRep = Number(req.params.idRep);
    const dRetour = req.body.dRetour;

    const demandereparation = await prisma.reparationExterne.update({
      data: { dRetour: dRetour },
      where: { idRep: idRep },
    });

    return res.status(200).json(demandereparation);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const updateReparationExternedEntree = async (
  req: Request,
  res: Response
) => {
  try {
    const idRep = Number(req.params.idRep);
    const dEntree = req.body.dEntree;

    const demandereparation = await prisma.reparationExterne.update({
      data: { dEntree: dEntree },
      where: { idRep: idRep },
    });

    return res.status(200).json(demandereparation);
  } catch (e) {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const EndReparationExterne = async (req: Request, res: Response) => {
  try {
    const idRep = Number(req.params.idRep);
    const codeMat = req.body.codeMat;

    const materiel = await prisma.materiel.update({
      data: { status: 2 },
      where: { codeMat: codeMat },
    });

    return res.status(200).json(materiel);
  } catch (e) {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const updateReparationInterne = async (req: Request, res: Response) => {
  try {
    const idRep = Number(req.params.idRep);
    const dDebRep = req.body.dDebRep;
    const dFinRep = req.body.dFinRep;
    const detail = req.body.detail;
    const cout = Number(req.body.cout);

    const reparation = await prisma.reparationInterne.update({
      data: {
        dDebRep: dDebRep,
        dFinRep: dFinRep,
        detailProbleme: detail,
        cout: cout,
      },
      where: {
        idRep: idRep,
      },
    });

    return res.status(200).json(reparation);
  } catch (e) {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const updateReparationExterne = async (req: Request, res: Response) => {
  try {
    const idRep = Number(req.params.idRep);
    const dDebRep = req.body.dDebRep;
    const dFinRep = req.body.dFinRep;
    const detail = req.body.detail;
    const cout = Number(req.body.cout);

    const reparation = await prisma.reparationExterne.update({
      data: {
        dDebRep: dDebRep,
        dFinRep: dFinRep,
        detailProbleme: detail,
        cout: cout,
      },
      where: {
        idRep: idRep,
      },
    });

    return res.status(200).json(reparation);
  } catch (e) {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

/* end demande travail */
