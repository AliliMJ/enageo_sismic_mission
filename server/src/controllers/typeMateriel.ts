import { Response, Request } from "express";


export const getTypeMaterialById = async (req: Request, res: Response) => {
    try {
      const  idTypeMat  = Number(req.params.id);

      console.log(""+idTypeMat);
      
      const typeMateriel = await prisma.typeMateriel.findFirst({ 
        where: { idTypeMat : idTypeMat } ,
      });
  
      return res.status(200).json(typeMateriel);
    } catch {
      res.status(500).json({ err: "Problème lors de la collection ce type matériel" });
    }
  };