import express from 'express';

import {
    getTypeMaterialById,
    getAllTypes
  } from '../controllers/typeMateriel';


 export const typeMaterielRouter = express.Router();


 typeMaterielRouter.get('/getTypeMaterielById/:id', getTypeMaterialById);
 typeMaterielRouter.get('/getAllTypes', getAllTypes);
