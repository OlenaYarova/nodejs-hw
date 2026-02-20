// src/server.js
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';


const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger)
app.use(cors());
app.use(express.json());


app.use(notesRoutes);

app.use(notFoundHandler)
app.use(errorHandler)


// підключення до MongoDB
await connectMongoDB();

// запуск сервера
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server started on port ${PORT}`);
});
