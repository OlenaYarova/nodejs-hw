// src/server.js
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { errors } from "celebrate";
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger)

app.use(express.json());

app.use(cors());

app.use(cookieParser());


app.use(authRoutes);

app.use(notesRoutes);


app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler)


// підключення до MongoDB
await connectMongoDB();

// запуск сервера
app.listen(PORT, (error) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
