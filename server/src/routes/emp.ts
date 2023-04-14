import express from 'express';
import paginate from '../middlewares/pagination';
import { verifyUserAuthentication, verifyUserAcces } from '../middlewares/auth';

import { getEmps, getEmpById } from '../controllers/emp';
import { Role } from '@prisma/client';

export const empRouter = express.Router();

empRouter.post(
  '/employees',
  verifyUserAuthentication,
  verifyUserAcces([Role.ADMINISTRATEUR]),
  paginate,
  getEmps
);
