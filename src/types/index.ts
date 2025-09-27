export interface CreateUserDto {
  email: string
  password: string
  name: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface CreateTaskDto {
  title: string
  description?: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  dueDate?: string
}

export interface AuthRequest extends Request {
  userId?: string
}