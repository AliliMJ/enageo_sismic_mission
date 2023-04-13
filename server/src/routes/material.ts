import express from 'express';
import paginate from '../middlewares/pagination';
import {
  getMaterial,
  getMaterialTypes,
  getMaterialByCode,
  mettreEnPanne,
  reparer,
} from '../controllers/material';

export const materialRouter = express.Router();

materialRouter.get('/', paginate, getMaterial);

materialRouter.get('/types', getMaterialTypes);

materialRouter.get('/:code', getMaterialByCode);

materialRouter.post('/:code/mettreEnPanne', mettreEnPanne);
materialRouter.post('/:code/reparer', reparer);
