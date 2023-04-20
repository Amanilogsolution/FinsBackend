const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const TotalChartOfAccount = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_sub_account tsa  with (nolock);`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const ChartOfAccountStatus = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_sub_account set status='${status}' where sno='${sno}';`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const GetChartOfAccount = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_sub_account tan2 with (nolock) where sno='${sno}'`)
        res.send(result.recordset[0])
    } catch (err) {
        res.send(err)
    }
}

const UpdateChartOfAccount = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    const account_sub_name = req.body.account_sub_name
    const User_id = req.body.User_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`UPDATE ${org}.dbo.tbl_sub_account  set account_sub_name='${account_sub_name}' ,update_user_name='${User_id}',update_system_name ='${os.hostname()}',
        update_ip_address ='${req.ip}',update_date_time=GETDATE() WHERE sno='${sno}';`)
        res.send(result.recordset[0])
    } catch (err) {
        res.send(err)
    }
}

const ImportChartofAccount = (req, res) => {
    const datas = req.body.datas;
    const org = req.body.org;
    const User_id = req.body.User_id;
    sql.connect(sqlConfig).then(() => {

        sql.query(`insert into ${org}.dbo.tbl_sub_account (account_type_code,account_name_code,account_sub_name,
            account_sub_name_code,account_description,add_user_name ,add_system_name ,add_ip_address ,add_date_time ,
            status) 
                    VALUES ${datas.map(item => `('${item.account_type_code}','${item.account_name_code}','${item.account_sub_name}','${item.account_sub_name_code}',
                    '${item.account_description}','${User_id}','${os.hostname()}','${req.ip}',getDate(),'Active')`).join(', ')}`)

        res.send("Data Added")
    }
    )
}

const ActiveChartofAccountname = async (req, res) => {
    const org = req.body.org;
    const account_sub_name = req.body.account_sub_name
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_sub_account tsa  with (nolock) where account_sub_name = '${account_sub_name}' `)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }

}
module.exports = { TotalChartOfAccount, ChartOfAccountStatus, GetChartOfAccount, UpdateChartOfAccount, ImportChartofAccount, ActiveChartofAccountname }