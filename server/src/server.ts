import express from 'express';
import cors from 'cors';

import { authRouter } from './routes/auth.ts';
import { userRouter } from './routes/user.ts';
import { empRouter } from './routes/emp.ts';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', empRouter);

app.listen(3000, () => console.log('listening at port 3000...'));
