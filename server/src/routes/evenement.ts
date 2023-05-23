import express from 'express';
import {
    getEvenementByProject,
    setAllevenemtnsReaded,
    insertnewEvenement
} from '../controllers/evenement';

export const evenementRouter = express.Router();


evenementRouter.get('/:idProjet', getEvenementByProject );
evenementRouter.put('/setTrue/:idProjet', setAllevenemtnsReaded );
evenementRouter.post('/insertEvenement/:idProjet', insertnewEvenement );