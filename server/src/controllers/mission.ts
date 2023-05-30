import { Response, Request } from 'express';

export const getMissions = async (req: Request, res: Response) => {
  try {
    const missions = await prisma.mission.findMany();

    return res.status(200).json(missions);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection des missions' });
  }
};

export const getMissionByCode = async (req: Request, res: Response) => {
  try {
    const { codeMission } = req.params;
    const mission = await prisma.mission.findFirst({ where: { codeMission } , include : {Chefs : true}});

    return res.status(200).json(mission);
  } catch {
    res
      .status(500)
      .json({ err: 'Problème lors de la collection de cette mission' });
  }
};

export const getMissionWithEvenements = async (
  req: Request,
  res: Response
) => {
  const codeMission = req.params.codeMission;

  try {
    const mission = await prisma.mission.findFirst({
      where: { codeMission: codeMission },
      include: {
        Evenements: {
          orderBy: {
            id: 'desc',
          },
        },
      },
    });

    return res.status(200).json(mission);
  } catch {
    res.status(500).json({
      err: 'Problème lors de la collection du mission',
    });
  }
};
