import express from 'express';
import { authRouter } from './auth/auth.router.ts';
import { adminRouter } from './admin/admin.router.ts';

const app = express();
app.use(express.json());
app.use('/', authRouter);
app.use('/admin', adminRouter);

app.listen(3000, () => console.log('listening at port 3000...'));
