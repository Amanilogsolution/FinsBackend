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
const { default: axios } = require("axios")
const twofactor = require("node-2fa");


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api',router)

app.post('/sendotp',async function (req,res){
  const phoneno = req.body.phoneno;
  const otp = req.body.otp;
  try{
         const result = axios.post(`http://www.alertwings.in/sendhttp.php?user=erpnto&password=erpnto123&mobiles=${phoneno}&message=${otp} is your One Time Password to log on to SWIM WMS.
          If not requested , Call IT.  2022-08-29 10:57:52&sender=OTPWMS&route=4&DLT_TE_ID=1207160975223863495`)
          .then(response => { res.send(response.data)})
          .catch(error => console.log(error))
          }
  catch (err) {
      console.log(err)
  }
})

app.post('/Twofa',async function(req,res){
  try{
    const newSecret = twofactor.generateSecret({ name: "Aman", account: "aman@ilogsolution" });
    res.send(newSecret)
  }  catch (err) {
      console.log(err)
  }
})

app.post('/VerifyTwo' , async function (req,res){
  const secret = req.body.secret;
  const otp = req.body.otp;
  console.log(secret,otp)
  try{
    const result = twofactor.verifyToken(secret, otp);
    if(result && result.delta === 0){
      res.send("Verify")
    }else{
      res.send("NotVerify")
    }

  }catch (err) {
      console.log(err)
  }
})





app.listen(port, (err, req, res, next) => {
    if (err)
      console.log("Ouch! Something went wrong")
    console.log(`server listen on: ${port}`)
  })
