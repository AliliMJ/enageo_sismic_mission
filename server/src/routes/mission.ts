import express from 'express';

import {
  getMissions,
  getMissionByCode,
  getMissionWithEvenements,
  insertMission,
} from '../controllers/mission.ts';

export const missionRouter = express.Router();

missionRouter.get('/', getMissions);
missionRouter.post('/', insertMission);

missionRouter.get('/MissionWithEvents/:codeMission', getMissionWithEvenements);
missionRouter.get('/:codeMission', getMissionByCode);
