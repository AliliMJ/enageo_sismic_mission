import express from 'express';
import {
  getEquipeById,
  getAllEquipes,
  getEquipesByMission,
  getEquipesByMission1,
  affecterEmployer,
} from '../controllers/equipe';

export const equipeRouter = express.Router();

equipeRouter.get('/', getAllEquipes);
equipeRouter.get('/:idEquipe', getEquipeById);
equipeRouter.get('/getEquipesbyMission/:codeMission', getEquipesByMission1);
equipeRouter.post('/mission', getEquipesByMission);
equipeRouter.post('/affecter', affecterEmployer);
