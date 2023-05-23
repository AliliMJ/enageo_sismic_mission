import express from 'express';
import {
  getProjets,
  getProjetById,
  insertProjet,
  getProjetByMission,
  getProjetsEnCours,
  getProjetByMissionWithEvenements,
} from '../controllers/projet';

export const projetRouter = express.Router();

projetRouter.get('/prod', getProjetsEnCours);

projetRouter.get(
  '/projetByMissionWithEvenements/:missionCode',
  getProjetByMissionWithEvenements
);

projetRouter.get('/projetByMission/:missionCode', getProjetByMission);
projetRouter.post('/create', insertProjet);
projetRouter.get('/:idProjet', getProjetById);
projetRouter.post('/', getProjets);
