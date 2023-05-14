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

export const getMaterialByCode = async (req: Request, res: Response) => {
  try {
    const { codeMat } = req.params;
    const material = await prisma.materiel.findFirst({ where: { codeMat } });

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

    await prisma.materiel.update({
      where: { codeMat },
      data: { status : 0 },
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
      data: { status : 0 },
    });

    return res.status(200).send(`Matériel ${codeMat} est mis en panne`);
  } catch {
    res.status(500).json({ err: "Problème lors de la collection ce matériel" });
  }
};

export const MettreEnReparation = async (req: Request, res: Response) => {
  console.log("abdelkrim");
  try {

    const  pannes  = req.body.pannes;
    const  codeMat  = req.params.codeMat;


    const reparation = await prisma.reparation.create({
      data: {
        codeMat : codeMat,
        dDebRep : new Date() ,
      },
    });

    pannes.forEach(async (element:any) => {
      await prisma.panne.create({
        data : {
          titre : element.titre,
          cout : element.cout,
          description : element.description,
          idRep : reparation.idRep
        }
      })
    });

    return res.status(200).send(`Matériel ${codeMat} est mis en panne`);
  } catch(e){
    console.log(e);
    res.status(500).json({ err: "Problème lors de la collection ce matériel" });
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

    await prisma.reparation.updateMany({
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

export const getMaterialByproject = async (req: Request, res: Response) => {
  const idProjet = Number(req.params.idProjet);
  try {
    const materials = await prisma.materiel.findMany({
      where: {
        idProjet: idProjet,
      },
    });

    return res.status(200).json(materials);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de la collection de matériel par projet" });
  }
};

export const getEnPanneMaterielByDesignation = async (
  req: Request,
  res: Response
) => {
  try {
    const idProjet = Number(req.params.idProjet);

    const materielEnPanne = await prisma.materiel.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter, 
        OR :[{status : 0 } , {status : 1}], 
        idProjet: idProjet },
    });

    res.status(200).json(materielEnPanne);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      err: `Èchec lors de la collection de materiel en panne ${req.params.designation}`,
    });
  }
};

export const getMaterialEnPanneByproject = async (
  req: Request,
  res: Response
) => {
  const idProjet = Number(req.params.idProjet);
  try {
    const materials = await prisma.materiel.findMany({
      where: {
        idProjet: idProjet,
        OR : [
          {
            status: 0,
          },
          {
            status: 1,
          }
        ]
        
      },
    });

    return res.status(200).json(materials);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de la collection de matériel par projet" });
  }
};

export const getMaterialGoodByproject = async (req: Request, res: Response) => {
  const idProjet = Number(req.params.idProjet);
  try {
    const materials = await prisma.materiel.findMany({
      where: {
        idProjet: idProjet,
        status: 2,
      },
    });

    return res.status(200).json(materials);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de la collection de matériel par projet" });
  }
};

export const getMaterialGoodByDesignation = async (req: Request,res: Response) => {
  try {
    const idProjet = Number(req.params.idProjet);

    console.log("--> "+idProjet);

    const materiels = await prisma.materiel.findMany({
      ...req.body.pagination?.options,
      where: { ...req.body.filter, status : 2 ,
      idProjet: idProjet,}
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
