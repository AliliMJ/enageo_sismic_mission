import express from 'express';
import cors from 'cors';

import { authRouter } from './routes/auth.ts';
import { userRouter } from './routes/user.ts';
<<<<<<< HEAD
import { empRouter } from './routes/emp.ts';
=======
import { materialRouter } from './routes/material.ts';
import { missionRouter } from './routes/mission.ts';
import { atelierRouter } from './routes/aterlier.ts';
import { employeRouter } from './routes/employe.ts';
>>>>>>> a026253fcc141808aa21ddf398dea0db5fd32bea

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', authRouter);
<<<<<<< HEAD
app.use('/', userRouter);
app.use('/', empRouter);
=======
app.use('/users', userRouter);
app.use('/material', materialRouter);
app.use('/missions', missionRouter);
app.use('/atelier', atelierRouter);
app.use('/employes', employeRouter);
>>>>>>> a026253fcc141808aa21ddf398dea0db5fd32bea

app.listen(3000, () => console.log('listening at port 3000...'));
