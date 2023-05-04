import express from 'express';
import {
   getEtatEmploye
  } from '../controllers/etatEmploye';

export const etatEmployeRouter = express.Router();

etatEmployeRouter.get('/:idEtat',getEtatEmploye);