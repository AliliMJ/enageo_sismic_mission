import express from 'express';
import {
    getEvenementByMission,
    setAllevenemtnsReaded,
    insertnewEvenement
} from '../controllers/evenement';

export const evenementRouter = express.Router();


evenementRouter.get('/:codeMission', getEvenementByMission );
evenementRouter.put('/setTrue/:codeMission', setAllevenemtnsReaded );
evenementRouter.post('/insertEvenement/:codeMission', insertnewEvenement );