import { Response, Request } from "express";

export const getEvenementByProject = async (req: Request, res: Response) => {
  try {
    const idProjet = Number(req.params.idProjet);

    const evenements = await prisma.evenement.findMany({
      where: { idProjet: idProjet },
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
    const idProjet = Number(req.params.idProjet);

    const evenements = await prisma.evenement.updateMany({
      where: { idProjet: idProjet, readed: false },
      data: { readed: true },
    });

    res.status(200).json(evenements);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de la mise les evenement a lu" });
  }
};

export const insertnewEvenement = async (req: Request, res: Response) => {
  try {
    const idProjet = Number(req.params.idProjet);
    const { titre, type, date, Heure, description } = req.body;

    const evenements = await prisma.evenement.create({
      data: {
        titre,
        type,
        date,
        Heure,
        description,
        readed: false,
        idProjet
      },
    });

    res.status(200).json(evenements);
  } catch {
    res
      .status(500)
      .json({ err: "Problème lors de l'insertion de l'evenement" });
  }
};
