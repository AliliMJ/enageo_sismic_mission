import express from 'express';
import {
   getEquipeById,
   getEquipes
  } from '../controllers/equipe';

export const equipeRouter = express.Router();

equipeRouter.get('/',getEquipes);
equipeRouter.get('/:idEquipe',getEquipeById);