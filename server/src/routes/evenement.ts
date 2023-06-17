import express from 'express';
import {
    getEvenementByMission,
    setAllevenemtnsReaded,
    insertnewEvenement,
    deleteEvenement,
    specialDelete
} from '../controllers/evenement';

export const evenementRouter = express.Router();


evenementRouter.get('/:codeMission', getEvenementByMission );
evenementRouter.put('/setTrue/:codeMission', setAllevenemtnsReaded );
evenementRouter.post('/insertEvenement/:codeMission', insertnewEvenement );

evenementRouter.delete('/delete/:id',deleteEvenement);
evenementRouter.delete('/specialDelete',specialDelete);