const sql = require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const Totalcurrency = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_currency with (nolock) order by sno desc`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}
const InsertCurrency = async (req, res) => {
    const org = req.body.org;
    const User_id = req.body.User_id;
    const country_name = req.body.country_name;
    const country_code = req.body.country_code;
    const currency_name = req.body.currency_name;
    const currency_code = req.body.currency_code;
    const uuid = uuidv1()
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from ${org}.dbo.tbl_currency with (nolock) where currency_name='${currency_name}'`)
        if (!duplicate.recordset.length) {
            const result = await sql.query(`insert into ${org}.dbo.tbl_currency (country_name,country_code,currency_name,currency_code,currency_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                        values('${country_name}','${country_code}','${currency_name}','${currency_code}','${uuid}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active')`)
            res.send('Added')
        } else {
            res.send("Already")
        }

    }
    catch (err) {
        res.send(err)
    }
}
const deleteCurrency = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_currency set status='${status}' where sno = ${sno}`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateCurrency = async (req, res) => {
    const org = req.body.org;
    const User_id = req.body.User_id;
    const sno = req.body.sno;
    const country_name = req.body.country_name;
    const country_code = req.body.country_code;
    const currency_name = req.body.currency_name;
    const currency_code = req.body.currency_code;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_currency set country_name='${country_name}',country_code='${country_code}',currency_name='${currency_name}',currency_code='${currency_code}',update_date_time=getdate(),update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}'  where sno = ${sno}`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}
async function ShowCurrency(req, res) {
    const sno = req.body.sno
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_currency with (nolock) where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

const ImportCurrency = (req, res) => {
    const datas = req.body.data;
    const org = req.body.org;
    const user_id = req.body.user_id;

    sql.connect(sqlConfig).then(() => {

        sql.query(`select * from ${org}.dbo.tbl_currency where country_name in ('${datas.map(data => data.country_name).join("', '")}') OR country_code in ('${datas.map(data => data.country_code).join("', '")}') OR currency_name in ('${datas.map(data => data.currency_name).join("', '")}') OR currency_code IN ('${datas.map(data => data.currency_code).join("', '")}')`)
            .then((resp) => {
                if (resp.rowsAffected[0] > 0)
                    res.send(resp.recordset.map(item => ({ "country_name": item.country_name, "country_code": item.country_code, "currency_name": item.currency_name, "currency_code": item.currency_code, })))
                else {
                    sql.query(`insert into ${org}.dbo.tbl_currency (country_name,country_code,currency_name,currency_code,currency_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                    values ${datas.map(item => `('${item.country_name}','${item.country_code}','${item.currency_name}','${item.currency_code}','${uuidv1()}',getdate(),'${user_id}','${os.hostname()}','${req.ip}','Active')`).join(',')}`)
                    res.send("Data Added")
                }
            })


    })


}



const ActiveCurrency = async (req, res) => {
    const org = req.body.org;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_currency with (nolock) WHERE status='Active'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = { Totalcurrency, InsertCurrency, deleteCurrency, UpdateCurrency, ShowCurrency, ImportCurrency, ActiveCurrency }