import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/tasks.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { taskSchema, validate } from '../middleware/validate.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', getTasks);
router.post('/', validate(taskSchema), createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;