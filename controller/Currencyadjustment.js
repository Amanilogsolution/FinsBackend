const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const AddCurrencyAdjustment = async(req,res)=>{
    const org = req.body.org;
    const currency = req.body.currency;
    try{
        await sql.connect(sqlConfig)
        currency.map((item) => 
            sql.query(`insert into ${org}.dbo.tbl_daily_curreny (currency,Rupee,US,EURO,UK,AUS,Japanese,Singapore,Reminbi,Taiwan,add_date_time,add_user_name,add_system_name,add_ip_address)
            values ('${item.Currency}','${item.Rupee}','${item.US}','${item.EURO}','${item.UK}','${item.AUS}','${item.Japanese}','${item.Singapore}','${item.Reminbi}','${item.Taiwan}',getdate(),'Aman','${os.hostname()}','${req.ip}') `)
            )
    }
    catch(err){
        res.send(err)
    }
}

module.exports= {AddCurrencyAdjustment}