// import cors from 'cors'
import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

import 'express-async-errors'
import morgan from 'morgan'
// db
// import connectDB from './db/connect.js'
import mongoose from 'mongoose'

// routes
import authRouter from './routes/authRouter.js'
import jobsRouter from './routes/jobsRouter.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

// app.use(cors())
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send({ message: 'Welcome' })
})

app.get('/api/v1', (req, res) => {
  res.send({ message: 'API' })
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

mongoose.connect(process.env.DATABASE_LOCAL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log(`con successful`)
  }).catch(err => {
    console.log(err);
  })

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server runing on port ${port}...`)
})