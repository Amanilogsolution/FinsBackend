const express = require('express')
const router = require('./router/router');
const os = require('os')
const app = express()
const port = 3008
const sql = require('mssql')
const bodyParser = require('body-parser')
const cors = require('cors')
const sqlConfig = require('./config.js')

app.use(cors({origin: '*'}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api',router)

app.post('/org', async(req, res) => {
    const org_name = req.body.org_name;
    const org_country = req.body.org_country;
    const org_state = req.body.org_state;
    const org_street = req.body.org_street;
    const org_city = req.body.org_city;
    const org_pin = req.body.org_pin?req.body.org_pin:null;
    const org_currency = req.body.org_currency;
    const org_lang = req.body.org_lang ;
       const org_gst = req.body.org_gst;
    const org_contact_name = req.body.org_contact_name;
    const org_contact_phone = req.body.org_contact_phone?req.body.org_contact_phone:null;
    const org_contact_email = req.body.org_contact_email;
    console.log(org_pin)
    console.log(org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into organisation(org_name,org_country,org_state,org_street,org_city,org_pin,org_currency,
            org_lang,org_gst,org_contact_name,org_contact_phone,org_contact_email,add_ip_address,
            add_date_time,add_user_name,add_system_name,status)
            values('${org_name}','${org_country}','${org_state}','${org_street}','${org_city}','${org_pin}','${org_currency}','${org_lang}','${org_gst}','${org_contact_name}',
            ${org_contact_phone},'${org_contact_email}','${req.ip}',getdate(),'Rupesh','${os.hostname()}','Active')`)
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
