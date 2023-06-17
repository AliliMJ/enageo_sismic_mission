import { Response, Request } from "express";

export const getEvenementByMission = async (req: Request, res: Response) => {
  try {
    const codeMission = String(req.params.codeMission);

    const evenements = await prisma.evenement.findMany({
      where: { codeMission : codeMission },
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json(evenements);
  } catch {
    res
      .status(500)
      .json({
        err: "Problème lors de la collection des evenements par projet",
      });
  }
};

export const setAllevenemtnsReaded = async (req: Request, res: Response) => {
  try {
    const codeMission = String(req.params.codeMission);

    const evenements = await prisma.evenement.updateMany({
      where: { codeMission: codeMission, readed: false },
      data: { readed: true },
    });

    res.status(200).json(evenements);
  } catch(e) {
    console.log(e);
    res
      .status(500)
      .json({ err: "Problème lors de la mise les evenement a lu" });
  }
};

export const insertnewEvenement = async (req: Request, res: Response) => {
  try {
    const codeMission = String(req.params.codeMission);
    const { titre, type, date, Heure, description } = req.body;

    const evenements = await prisma.evenement.create({
      data: {
        titre : titre,
        type : type,
        date : date,
        Heure : Heure,
        description : description,
        readed: false,
        codeMission : codeMission
      },
    });

    res.status(200).json(evenements);
  } catch(e) {
    console.log(e);
    res
      .status(500)
      .json({ err: "Problème lors de l'insertion de l'evenement" });
  }
};

export const deleteEvenement = async (req: Request, res: Response) => {
  try {

    const id = Number(req.params.id);

    const evenement = await prisma.evenement.delete({
      where : {
        id : id
      }
    })

    res.status(200).json(evenement);
  } catch(e) {
    console.log(e);
    res
      .status(500)
      .json({ err: "Problème lors de la suppression de l'evenement" });
  }
};

export const specialDelete = async (req: Request, res: Response) => {
  try {

    const titre = req.body.titre;
    const date = req.body.date;
    const heure = req.body.heure;

    const evenement = await prisma.evenement.deleteMany({
      where : {
        titre : titre,
        date : date,
        Heure : heure
      }
    })

    res.status(200).json(evenement);
  } catch(e) {
    console.log(e);
    res
      .status(500)
      .json({ err: "Problème lors de la suppression de l'evenement" });
  }
};
