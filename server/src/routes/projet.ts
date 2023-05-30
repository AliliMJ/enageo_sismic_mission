import express from 'express';
import {
  getProjets,
  getProjetById,
  insertProjet,
  getProjetByMission,
  getProjetsEnCours,
  updateProjet,
  getProjetEnCoursByMission,
} from '../controllers/projet';
import { NotExistProdProjectInMission } from '../middlewares/projectConstraint';

export const projetRouter = express.Router();

projetRouter.get('/prod', getProjetsEnCours);
projetRouter.get('/prodByMission/:codeMission', getProjetEnCoursByMission);

projetRouter.get('/projetByMission/:missionCode', getProjetByMission);
projetRouter.post('/create', insertProjet);
projetRouter.get('/:idProjet', getProjetById);
projetRouter.put('/:idProjet', NotExistProdProjectInMission, updateProjet);
projetRouter.post('/', getProjets);
