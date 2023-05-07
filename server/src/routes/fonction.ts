import express from 'express';
import {
   getFonctionById,
   getFonctions
  } from '../controllers/fonction';

export const fonctionRouter = express.Router();

fonctionRouter.get('/:idFonction',getFonctionById);
fonctionRouter.get('/',getFonctions);