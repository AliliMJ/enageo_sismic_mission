import express from 'express';
import {
  insertConsommation,
  createResource,
  getResources,
} from '../controllers/resource';
import { resourceFilter } from '../middlewares/filter';

export const resourceRouter = express.Router();

resourceRouter.post('/consommation', insertConsommation);
resourceRouter.post('/', createResource);
resourceRouter.get('/titre', resourceFilter, getResources);
