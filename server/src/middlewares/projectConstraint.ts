import { TypeEtatProjet } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export const NotExistProdProjectInMission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idProjet = Number(req.params.idProjet);
  const createdStates = req.body.createdStates ?? [];
  const annule = req.body.annule;
  const project = await prisma.projet.findUnique({
    where: { idProjet },
    select: { Mission: true },
  });

  if (
    createdStates[createdStates.length - 1]?.etat === 'EN_PRODUCTION' &&
    !annule
  ) {
    const projectsInProd: number[] = await prisma.$queryRaw`
    SELECT p.idProjet
    FROM Projet p
    JOIN EtatProjet ep ON p.idProjet = ep.idProjet
    WHERE ep.etat = 'EN_PRODUCTION'
    AND   p.codeMission=${project?.Mission.codeMission}
    AND p.annule = FALSE
         
      AND ep.id = (
        SELECT MAX(ep2.id)
        FROM EtatProjet ep2
        WHERE ep2.idProjet = p.idProjet
      )
`;

    if (projectsInProd?.length === 0) return next();
    else
      return res.status(400).json({
        err: "Un chantier ne peut avoir qu'un seul projet en production à la fois",
      });
  } else {
    return next();
  }
};
