import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getTasks, addTask, updateTask, deleteTask, getTaskById } from '../controllers/taskController';

const router = Router();

router.use(authMiddleware); 


router.post('/', authMiddleware, addTask);
router.get('/', authMiddleware, getTasks);
router.get('/:id', authMiddleware, getTaskById);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);





export default router;
