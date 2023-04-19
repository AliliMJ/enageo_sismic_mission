import express from 'express';
import { getProjets, getProjetById, insertProjet } from '../controllers/projet';

export const projetRouter = express.Router();

projetRouter.post('/', getProjets);

projetRouter.get('/:id', getProjetById);

projetRouter.post('/create', insertProjet);
