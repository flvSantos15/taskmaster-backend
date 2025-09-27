import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"

const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

export { app }
