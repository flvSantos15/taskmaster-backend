import { prisma } from "../libs/prisma"

beforeAll(async () => {
  await prisma.$connect()
})

afterAll(async () => {
  await prisma.user.deleteMany()
  await prisma.task.deleteMany()
  await prisma.$disconnect()
})

afterEach(async () => {
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()
})