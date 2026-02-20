import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote
} from '../controllers/notesController';

const router = Router()


//Маршрут для отримання всіх нотаток
router.get('/notes', getAllNotes);

//Маршрут для отримання нотатки за ID
router.get('/notes/:noteId', getNoteById);

//Маршрут для створення нової нотатки
router.post('/notes', createNote);

//Маршрут для видалення нотатки за ID
router.delete('/notes/:noteId', deleteNote);

//Маршрут для оновлення нотатки за ID
router.put('/notes/:noteId', updateNote);


export default router;
