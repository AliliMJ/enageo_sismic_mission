import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.ts';

import { userRouter } from './routes/user.ts';
import { materialRouter } from './routes/material.ts';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', materialRouter);

app.listen(3000, () => console.log('listening at port 3000...'));
