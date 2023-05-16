import { Response, Request } from 'express';

export const getReparations = async (req: Request, res: Response) => {
  try {
    const reparations = await prisma.reparation.findMany({
      ...req.body.pagination?.options,
    });

    return res.status(200).json(reparations);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des réparations' });
  }
};

export const getPannes = async (req: Request, res: Response) => {
  try {
    const pannes = await prisma.panne.findMany();

    return res.status(200).json(pannes);
  } catch {
    res.status(500).json({ err: 'Problème lors de la collection des pannes' });
  }
};

export const getReparationsByMaterialCode = async (
  req: Request,
  res: Response
) => {
  try {
    const  codeMat  = req.params.codeMat;

    const reparations = await prisma.reparation.findMany({
      where: { codeMat : codeMat },
      orderBy: {
        dPanne : 'asc',
      },
    });

    return res.status(200).json(reparations);
  } catch(e) {
    console.log(e)
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const getLastReparationsByMaterialCode = async (
  req: Request,
  res: Response
) => {
  try {
    const codeMat  = req.params.codeMat;
    const reparations = await prisma.reparation.findFirst({
      where: { codeMat : codeMat , dFinRep : null  },
    });

    return res.status(200).json(reparations);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const getLastReparationsByMaterialCode1 = async (
  req: Request,
  res: Response
) => {
  try {
    const codeMat  = req.params.codeMat;
    const reparations = await prisma.reparation.findMany({
      where: { codeMat : codeMat },
      orderBy: {
        dPanne : 'asc',
      },
    });

    return res.status(200).json(reparations[reparations.length-1]);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const getAtelierMecanique = async (
  req: Request,
  res: Response
) => {
  try {

    const materielEnPanne = await prisma.materiel.findMany({
      where: { OR : [
        {status : 0} , 
        {status : 1}
      ] },
      orderBy: {
        codeMat : 'asc',
      },
    });

    const reparations = await prisma.reparation.findMany({
      where: { dDebRep : null  },
      orderBy: {
        codeMat : 'asc',
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
      codeMat : String,
      designation : String,
      matricule : String,
      status : Number,
      dPanne : Date | null,
      dDebRep : Date | null,
      dFinRep : Date | null
    };

    const atelier = [];
    
    let i=0;
    for(i=0;i<materielEnPanne.length;i++){

      const vard: TypeAtelier = {
      codeMat : materielEnPanne[i].codeMat,
      designation : materielEnPanne[i].designation,
      matricule :  materielEnPanne[i].matricule,
      status : materielEnPanne[i].status,
      dPanne :  reparations[i].dPanne,
      dDebRep : reparations[i].dDebRep,
      dFinRep : reparations[i].dFinRep
      }

      atelier.push(vard);

    }


    return res.status(200).json({atelier});
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

export const getReparationsById = async (
  req: Request,
  res: Response
) => {
  try {
    
    const idRep  = Number(req.params.idRep);
  
    const reparation = await prisma.reparation.findUnique({
      where: { idRep : idRep },
    });

    return res.status(200).json(reparation);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection des reparations pour ce matériel',
    });
  }
};

