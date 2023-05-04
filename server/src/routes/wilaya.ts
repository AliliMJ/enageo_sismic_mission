import express from 'express';
import {
  getWilayas,
  getWilayaByNum
} from '../controllers/wilaya';


export const wilayaRouter = express.Router();

wilayaRouter.get('/',getWilayas);
wilayaRouter.get('/:numWilaya',getWilayaByNum);

