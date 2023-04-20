const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const TotalAccountMinorCode = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_account_name with (nolock);`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const AccountMinorCodeStatus = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_account_name set status='${status}' where sno='${sno}'`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}

const GetAccountMinorCode = async (req, res) => {
    const org = req.body.org;
    const AccountMinorCode = req.body.AccountMinorCode;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_account_name tan2 with (nolock) where account_name_code='${AccountMinorCode}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateAccountMinorCode = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    const account_name = req.body.account_name;
    const User_id = req.body.User_id;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`UPDATE ${org}.dbo.tbl_account_name  set account_name='${account_name}',update_user_name='${User_id}',update_system_name ='${os.hostname()}',
        update_ip_address ='${req.ip}',update_date_time=GETDATE() WHERE sno='${sno}';`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

const ActiveAccountMinorCode = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select account_type_code,account_name,account_name_code from ${org}.dbo.tbl_account_name tan2 with (nolock) where status='Active';`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const GetAccountMinorCodeName = async (req, res) => {
    const org = req.body.org;
    const account_name_code = req.body.account_name_code;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select account_name from ${org}.dbo.tbl_account_name with (nolock) WHERE account_name_code='${account_name_code}';`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}


const ImportAccountMinorCode = (req, res) => {
    const org = req.body.org;
    const datas = req.body.datas;
    const User_id = req.body.User_id;

    sql.connect(sqlConfig).then(() => {
        sql.query(`Insert into ${org}.dbo.tbl_account_name (account_type_code,account_name,account_name_code,account_description,
                    add_user_name,add_system_name,add_ip_address,add_date_time,status) 
                    VALUES ${datas.map(item => `('${item.account_type_code}','${item.account_name}','${item.account_name_code}','${item.account_description}','${User_id}','${os.hostname()}','${req.ip}',getdate(),'Active')`).join(', ')}`)
        res.send("Data Added")
       
    })
}
module.exports = { TotalAccountMinorCode, AccountMinorCodeStatus, GetAccountMinorCode, UpdateAccountMinorCode, ActiveAccountMinorCode, ImportAccountMinorCode, GetAccountMinorCodeName }