const express = require('express')
const router = require('./router/router');
const os = require('os')

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



app.post('/org', async(req, res) => {
    const org_name = req.body.org_name
    const org_country = req.body.org_country
    const org_state = req.body.org_state
    const org_street1 = req.body.org_street1
    const org_street2 = req.body.org_street2
    const org_city = req.body.org_city
    let org_pin = req.body.org_pin
    const org_currency = req.body.org_currency
    const org_lang = req.body.org_lang
    const org_timezone = req.body.org_timezone
    let org_gst = req.body.org_gst
    console.log(org_name, org_country, org_state, org_street1, org_street2, org_city, org_pin, org_currency, org_lang, org_timezone, org_gst)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into Organisation (org_name,org_country,org_state,org_street1,org_street2,org_city,org_pin,org_currency,org_lang,org_timezone,org_gst) values 
        ('${org_name}','${org_country}','${org_state}','${org_street1}','${org_street2}','${org_city}','${org_pin}','${org_currency}','${org_lang}','${org_timezone}','${org_gst}')`)
        res.send('done')
    }
    catch(err){
        console.log(err)
    }
})




app.listen(port, (err, req, res, next) => {
    if (err)
      console.log("Ouch! Something went wrong")
    console.log(`server listen on: ${port}`)
  })
