import express from 'express'

import authRouter from './router/auth'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use('/auth', authRouter)

app.get('/', (req, res) => {
  console.log('get /')

})

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} 포트에서 실행중`)
})