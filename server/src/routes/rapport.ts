import express from 'express';
import {
  getRapportById,
  getAllRapports,
  getRapportsByProjet,
} from '../controllers/rapport';

export const rapportRouter = express.Router();

rapportRouter.get('/', getAllRapports);
rapportRouter.get('/:idRapport', getRapportById);
rapportRouter.post('/mission', getRapportsByProjet);
