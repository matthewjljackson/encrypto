import express from 'express';
import authRoutes from './routes/auth/auth.routes';
import coinsRoutes from './routes/coins/coins.routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
<<<<<<< HEAD
import { connectDb }  from './models/index';
=======
import { connectDb } from './models/index';
>>>>>>> 5c7616d3be2acae7b1c06c13429b489834c5a443

dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  })
);

app.use(cookieParser());

app.use('/coins', coinsRoutes);

app.use('/', authRoutes);

(async () => await connectDb())();

const server = app.listen(PORT, () => {
  console.log(`express running on port: ${PORT}`);
});

export default server;

export { app };
