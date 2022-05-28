const express = require('express')
const router = require('./router/router');
const os = require('os')
require('dotenv').config()

const app = express()
const port = 3008
const sql = require('mssql')
const bodyParser = require('body-parser')
const cors = require('cors')
const sqlConfig = require('./config.js')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api',router)




app.listen(port, (err, req, res, next) => {
    if (err)
      console.log("Ouch! Something went wrong")
    console.log(`server listen on: ${port}`)
  })
