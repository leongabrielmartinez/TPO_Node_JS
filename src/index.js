"use strict"
import './config/mongoDB.js'
import express from 'express'; 
import { router as songsRouter } from './routers/songs.js';
import { router as authRouter } from './routers/auth.js'

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.json())
app.use("/api/songs", songsRouter)
app.use("/api/auth", authRouter)

app.listen(PORT, (err) => {
    err ? console.log(`Server not running: ${err}`)
    :
    console.log(`Server up: http://localhost:3000`)
})