const express = require('express')
const app = express()

const router = require('./routes/productsRoutes.js')

app.use(express.json())
app.use('/products',router)

app.listen('3000')
