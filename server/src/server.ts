import express from 'express';
import cors from 'cors';

import { authRouter } from './routes/auth.ts';
import { userRouter } from './routes/compte.ts';
import { materialRouter } from './routes/material.ts';
import { missionRouter } from './routes/mission.ts';
import { atelierRouter } from './routes/aterlier.ts';
import { employeRouter } from './routes/employe.ts';
import { projetRouter } from './routes/projet.ts';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', authRouter);
app.use('/comptes', userRouter);
app.use('/material', materialRouter);
app.use('/missions', missionRouter);
app.use('/atelier', atelierRouter);
app.use('/employes', employeRouter);
app.use('/projets', projetRouter);

app.listen(3000, () => console.log('listening at port 3000...'));
