import { Response } from 'express';
import { prisma } from '../libs/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { status, priority, page = '1', limit = '10' } = req.query;

    const where: any = {
      assigneeId: req.userId
    };

    if (status) where.status = status;
    if (priority) where.priority = priority;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: parseInt(limit as string),
        orderBy: { createdAt: 'desc' },
        include: {
          assignee: {
            select: { id: true, name: true, email: true }
          }
        }
      }),
      prisma.task.count({ where })
    ]);

    res.json({
      tasks,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error('Erro ao buscar tasks:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority = 'MEDIUM', dueDate } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority as any,
        dueDate: dueDate ? new Date(dueDate) : null,
        assigneeId: req.userId!
      },
      include: {
        assignee: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json({
      message: 'Task criada com sucesso',
      task
    });
  } catch (error) {
    console.error('Erro ao criar task:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    // Verificar se a task pertence ao usuário
    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        assigneeId: req.userId
      }
    });

    if (!existingTask) {
      return res.status(404).json({ message: 'Task não encontrada' });
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        assignee: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json({
      message: 'Task atualizada com sucesso',
      task
    });
  } catch (error) {
    console.error('Erro ao atualizar task:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar se a task pertence ao usuário
    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        assigneeId: req.userId
      }
    });

    if (!existingTask) {
      return res.status(404).json({ message: 'Task não encontrada' });
    }

    await prisma.task.delete({
      where: { id }
    });

    res.json({ message: 'Task deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar task:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};