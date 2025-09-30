import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/tasks.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { taskSchema, validate } from '../middleware/validate.middleware';

const taskRouter = Router();

taskRouter.use(authenticateToken);

taskRouter.get('/', getTasks);
taskRouter.post('/', validate(taskSchema), createTask);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

export { taskRouter };
