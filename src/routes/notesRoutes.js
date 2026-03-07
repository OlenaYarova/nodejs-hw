import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema
} from '../validations/notesValidation.js';


const router = Router()

router.use('/notes', authenticate) // Додаємо middleware для аутентифікації до всіх маршрутів нотаток

//Маршрут для отримання всіх нотаток
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

//Маршрут для отримання нотатки за ID
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

//Маршрут для створення нової нотатки
router.post('/notes', celebrate(createNoteSchema), createNote);

//Маршрут для видалення нотатки за ID
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

//Маршрут для оновлення нотатки за ID
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);


export default router;
