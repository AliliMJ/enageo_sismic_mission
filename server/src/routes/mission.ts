import express from 'express';

import { getMissions, getMissionByCode } from '../controllers/mission.ts';

export const missionRouter = express.Router();

missionRouter.get('/', getMissions);

missionRouter.get('/:codeMission', getMissionByCode);
