import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import authRoutes from './routes/authRoute.js'
import itemRoutes from './routes/itemRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors'

dotenv.config()


connectDB()


const app = express()
app.use(cors());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend Connected Successfully 🚀" });
});



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Mount routes
app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)

// Base route
app.get('/', (req, res) => {
  res.send('API is running...')
})


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})