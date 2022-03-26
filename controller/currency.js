const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

const currency = async (req, res) => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_currency order by sno desc`)
        res.send(result.recordset)
    } catch (err) {
        console.log(err)
    }
}
const InsertCurrency = async (req, res) => {
    const country_name = req.body.country_name;
    const country_code = req.body.country_code;
    const currency_name = req.body.currency_name;
    const currency_code = req.body.currency_code;
    console.log(country_name, country_code, currency_name, currency_code)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into tbl_currency (country_name,country_code,currency_name,currency_code,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                        values('${country_name}','${country_code}','${currency_name}','${currency_code}',getdate(),'admin','${os.hostname()}','${req.ip}','Active')`)
        res.send('Added')
    }
    catch(err){
        console.log(err)
    }
}
const deleteCurrency = async (req, res) => {
    const sno = req.body.sno;
    const status = req.body.status;
    console.log(sno, status)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_currency set status='${status}' where sno = ${sno}`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        console.log(err)
    }
}

const UpdateCurrency = async (req, res) => {
    const sno = req.body.sno;
    const country_name = req.body.country_name;
    const country_code = req.body.country_code;
    const currency_name = req.body.currency_name;
    const currency_code = req.body.currency_code;
    console.log(sno, country_name, country_code, currency_name, currency_code)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_currency set country_name='${country_name}',country_code='${country_code}',currency_name='${currency_name}',currency_code='${currency_code}',update_date_time=getdate(),update_user_name='aman',update_system_name='${os.hostname()}',update_ip_address='${req.ip}'  where sno = ${sno}`)
        res.send('Updated')
    }
    catch (err) {
        console.log(err)
    }
}
async function ShowCurrency(req, res) {
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_currency where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {currency,InsertCurrency,deleteCurrency,UpdateCurrency,ShowCurrency}