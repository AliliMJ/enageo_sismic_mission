import express from 'express';
import { getProjets,
        getProjetById, 
        insertProjet,
        getProjetByMission,
        getProjetByMissionWithEvenements } from '../controllers/projet';

export const projetRouter = express.Router();

projetRouter.post('/', getProjets);
projetRouter.get('/:idProjet', getProjetById);
projetRouter.get('/projetByMission/:missionCode', getProjetByMission);
projetRouter.get('/projetByMissionWithEvenements/:missionCode', getProjetByMissionWithEvenements);

projetRouter.post('/create', insertProjet);
