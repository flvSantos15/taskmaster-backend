import { NextFunction, Request, Response } from 'express'
import { prisma } from '../libs/prisma'
import { verifyToken } from '../utils/jwt.util'

export interface AuthRequest extends Request {
  userId?: string
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Beaer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Access Token Required' })
    }

    const decoded = verifyToken(token)
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid Token' })
  }
}