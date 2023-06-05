import express from 'express';
import {
  insertConsommation,
  createResource,
  getResources,
  addResourceToProject,
  getStock,
  getStockByResource,
  getConsumption,
} from '../controllers/resource';
import { resourceFilter } from '../middlewares/filter';

export const resourceRouter = express.Router();

resourceRouter.post('/consommation', insertConsommation);
resourceRouter.get('/consommation', getConsumption);
resourceRouter.post('/addResource', addResourceToProject);
resourceRouter.post('/', createResource);
resourceRouter.get('/', resourceFilter, getResources);
resourceRouter.get('/stock/:idProjet', getStock);
resourceRouter.get('/stock/:idProjet/:idResource', getStockByResource);
