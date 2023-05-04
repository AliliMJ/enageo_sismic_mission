import express from 'express';
import {
   getFonction
  } from '../controllers/fonction';

export const fonctionRouter = express.Router();

fonctionRouter.get('/:idFonction',getFonction);