import express from 'express';
import {
  getEquipeById,
  getAllEquipes,
  getEquipesByMission,
} from '../controllers/equipe';

export const equipeRouter = express.Router();

equipeRouter.get('/', getAllEquipes);
equipeRouter.get('/:idEquipe', getEquipeById);
equipeRouter.post('/mission', getEquipesByMission);
