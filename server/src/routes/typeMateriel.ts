import express from 'express';

import {
    getTypeMaterialById
  } from '../controllers/typeMateriel';


 export const typeMaterielRouter = express.Router();


 typeMaterielRouter.get('/getTypeMaterielById/:id', getTypeMaterialById);
