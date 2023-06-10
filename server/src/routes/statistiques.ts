import express from 'express';
import {
    getGestionnaireStatistiques,
    atelierStatistiques,
} from '../controllers/statistiques';

export const statistiquesRouter = express.Router();

statistiquesRouter.get('/getGestionnaireStatistiques/:codeMission', getGestionnaireStatistiques);
statistiquesRouter.get('/atelierstatistiques/:codeMission', atelierStatistiques);