const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const currency = async (req, res) => {
    const org = req.body.org
    console.log(org)
    try {
        await sql.connect(sqlConfig)
        const Organisation = await sql.query(`SELECT * from FINSDB.dbo.org_name`)
        console.log(Organisation.rowsAffected[0])
        if(Organisation.rowsAffected[0] == 0)
        {
            res.send('UnAuthorized')
        }else{

        const result = await sql.query(`select * from ${org}.dbo.tbl_currency order by sno desc`)
        res.send(result.recordset)
        }
    } catch (err) {
        console.log(err)
    }
}
const InsertCurrency = async (req, res) => {
    const country_name = req.body.country_name;
    const country_code = req.body.country_code;
    const currency_name = req.body.currency_name;
    const currency_code = req.body.currency_code;
    const uuid = uuidv1()
    console.log(country_name, country_code, currency_name, currency_code)
    try{
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from FINSDB.dbo.tbl_currency where currency_name='${currency_name}' OR currency_code='${currency_code}'`)
        console.log(duplicate.recordset[0])
        if(!duplicate.recordset.length){
          const result = await sql.query(`insert into FINSDB.dbo.tbl_currency (country_name,country_code,currency_name,currency_code,currency_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                        values('${country_name}','${country_code}','${currency_name}','${currency_code}','${uuid}',getdate(),'admin','${os.hostname()}','${req.ip}','Active')`)
        res.send('Added')
}else{
   res.send("Already")
}

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
        const result = await sql.query(`update FINSDB.dbo.tbl_currency set status='${status}' where sno = ${sno}`)
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
        const result = await sql.query(`update FINSDB.dbo.tbl_currency set country_name='${country_name}',country_code='${country_code}',currency_name='${currency_name}',currency_code='${currency_code}',update_date_time=getdate(),update_user_name='aman',update_system_name='${os.hostname()}',update_ip_address='${req.ip}'  where sno = ${sno}`)
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
        const result = await sql.query(`select * from FINSDB.dbo.tbl_currency where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        console.log(err)
    }
}

const ImportCurrency = (req,res) =>{
    const datas = req.body.data;
    // console.log(datas)
    // let duplicatedate = [];

    sql.connect(sqlConfig).then(() => {

         sql.query(`select * from FINSDB.dbo.tbl_currency where country_name in ('${datas.map(data => data.country_name).join("', '")}') OR country_code in ('${datas.map(data => data.country_code).join("', '")}') OR currency_name in ('${datas.map(data => data.currency_name).join("', '")}') OR currency_code IN ('${datas.map(data => data.currency_code).join("', '")}')`)
                .then((resp) => {
                    console.log(resp.rowsAffected[0])
                    if (resp.rowsAffected[0]>0)
                    res.send(resp.recordset.map(item => ({ "country_name": item.country_name, "country_code": item.country_code, "currency_name": item.currency_name, "currency_code": item.currency_code,})))  
                else{

                    sql.query(`insert into FINSDB.dbo.tbl_currency (country_name,country_code,currency_name,currency_code,currency_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                    values('${item.country_name}','${item.country_code}','${item.currency_name}','${item.currency_code}','${uuidv1()}',getdate(),'admin','${os.hostname()}','${req.ip}','Active')`)
                    res.send("Data Added")
                } 
              })
    
        // console.log(duplicatedate)

    })


}

module.exports = {currency,InsertCurrency,deleteCurrency,UpdateCurrency,ShowCurrency,ImportCurrency}