import express from 'express';
import cors from 'cors';

import { authRouter } from './routes/auth.ts';
import { userRouter } from './routes/compte.ts';
import { materialRouter } from './routes/material.ts';
import { missionRouter } from './routes/mission.ts';
import { atelierRouter } from './routes/aterlier.ts';
import { employeRouter } from './routes/employe.ts';
import { projetRouter } from './routes/projet.ts';
import { fonctionRouter } from './routes/fonction.ts';
import { equipeRouter } from './routes/equipe.ts';
import { wilayaRouter } from './routes/wilaya.ts';
import { typeMaterielRouter } from './routes/typeMateriel.ts';
import { rapportRouter } from './routes/rapport.ts';
import { evenementRouter } from './routes/evenement.ts';
import { statistiquesRouter } from './routes/statistiques.ts';

import { resourceRouter } from './routes/resource.ts';

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
app.use('/rapports', rapportRouter);
app.use('/fonction', fonctionRouter);
app.use('/equipes', equipeRouter);
app.use('/wilaya', wilayaRouter);
app.use('/resource', resourceRouter);
app.use('/evenement', evenementRouter);
app.use('/statistiques', statistiquesRouter);

app.use('/typeMateriel', typeMaterielRouter);

app.listen(3000, () => console.log('listening at port 3000...'));
