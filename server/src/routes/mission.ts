import express from 'express';

import { getMissions, getMissionByCode , getMissionWithEvenements } from '../controllers/mission.ts';

export const missionRouter = express.Router();

missionRouter.get('/', getMissions);

missionRouter.get('/MissionWithEvents/:codeMission', getMissionWithEvenements);
missionRouter.get('/:codeMission', getMissionByCode);
