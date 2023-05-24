import express from 'express';
import {
    getGestionnaireStatistiques
} from '../controllers/statistiques';

export const statistiquesRouter = express.Router();

statistiquesRouter.get('/getGestionnaireStatistiques/:codeMission', getGestionnaireStatistiques);