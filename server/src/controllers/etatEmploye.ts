import { Response, Request } from 'express';

// export const getEtatEmploye = async (req: Request, res: Response) => {
//     // const value = req.query.like;
//     // console.log(value);
//     try {
//       const etatEmploye = await prisma.etatemploye.findMany({
//         ...req.body.pagination?.options,
//         where: { ...req.body.filter },
//       });
  
//       res.status(200).json(employes);
//     } catch {
//       res
//         .status(500)
//         .json({ err: 'Problème lors de la collection des employés' });
//     }
//   };

  export const getEtatEmploye = async (req: Request, res: Response) => {
    try {
      const idEtat = Number(req.params.idEtat);
      const etatemploye = await prisma.etatEmploye.findUnique({ where: { idEtat } });
      res.status(200).json(etatemploye);
    } catch {
      res.status(500).json({
        err: `Èchec lors de la collection de l'etat de l'employe ${req.params.idEtat}`,
      });
    }
  };