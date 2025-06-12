import express from 'express';
import { createNotes, deleteNotes, getAllNotes, updateNotes, getNotesbyId } from '../controllers/notesControllers.js';
const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNotesbyId); 
router.post('/', createNotes);
router.put('/:id', updateNotes);
router.delete('/:id', deleteNotes);

export default router;