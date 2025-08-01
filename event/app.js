import express from 'express'
import bodyparser from 'body-parser'
import router from './routes.js'

const app=express()

app.use(bodyparser.json())

app.use('/events',router)

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})