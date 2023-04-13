import express from 'express';
import paginate from '../middlewares/pagination';
import { getMaterial, getMaterialTypes } from '../controllers/material';

export const materialRouter = express.Router();

materialRouter.get('/material', paginate, getMaterial);

materialRouter.get('/material/types', getMaterialTypes);
