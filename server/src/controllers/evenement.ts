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
