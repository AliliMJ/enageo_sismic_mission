import express from 'express';
import { insertConsommation } from '../controllers/consommation';

export const consommationRoute = express.Router();

consommationRoute.post('/', insertConsommation);
