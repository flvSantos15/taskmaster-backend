import { PrismaClient } from "../generated/prisma";
import { hashPassword } from "../utils/password.util";

const prisma = new PrismaClient()

export const creaeTestUser = async (overrides = {}) => {
  const defaultUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: await hashPassword('password123'),
    ...overrides
  }

  return prisma.user.create({
    data: defaultUser
  })
}

export const createTestTask = async (userId: string, overrides = {}) => {
  const defaultTask = {
    title: 'Test Task',
    description: 'Test Description',
    assigneeId: userId,
    ...overrides
  }

  return prisma.task.create({
    data: defaultTask
  })
}