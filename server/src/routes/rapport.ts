import express from 'express';
import {
  getRapportById,
  getAllRapports,
  getRapportsByProjet,
  insertRapport,
  getProduction,
  getProductionByProject,
} from '../controllers/rapport';

export const rapportRouter = express.Router();

rapportRouter.get('/', getAllRapports);
rapportRouter.get('/production/:codeActivite', getProduction);
rapportRouter.get('/productionByProject/:idProjet', getProductionByProject);
rapportRouter.get('/:idRapport', getRapportById);
rapportRouter.post('/mission', getRapportsByProjet);
rapportRouter.post('/', insertRapport);
