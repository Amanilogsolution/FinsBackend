const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const InsertAccountType = async (req, res) => {
    const account_type = req.body.account_type;
    const account_type_code = req.body.account_type_code;
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from FINSDB.dbo.tbl_account_type where account_type_code='${account_type_code}' OR account_type='${account_type}'`)
        if (!duplicate.recordset.length) {
        const result = await sql.query(`INSERT into FINSDB.dbo.tbl_account_type (account_type,account_type_code,add_user_name,add_system_name,
            add_ip_address ,add_date_time ,status ) values('${account_type}','${account_type_code}','Rupesh','${os.hostname()}','${req.ip}',getDate(),'Active');`)
        res.send('Added')
        } else {
            res.send("Already")
        }
    }
    catch (err) {
        console.log(err)
    }
}

const UpdateAccountName = async (req, res) => {
    const account_type = req.body.account_type;
    const account_type_code = req.body.account_type_code;
    const org = req.body.org;
    const uniqueID = req.body.uniqueID
    console.log(account_type,account_type_code,org,uniqueID)

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_account_type set account_type='${account_type}',account_type_code ='${account_type_code}',update_user_name='rupesh',
        update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=GETDATE()
        WHERE account_type_code='${uniqueID}'`)
        res.send('Updated')
    }
    catch(err){
        console.log(err)
    }
}

const TotalAccountName = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_account_type tat with (nolock);`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const AccountnameStatus = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status;
    const account_type_code = req.body.account_type_code;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_account_type set status='${status}' WHERE account_type_code='${account_type_code}';
        `)
        res.send(result.recordset)
    }   catch (err) {       
        res.send(err)
    }
}
const SelectAccountName = async (req, res) => {
    const org = req.body.org;
    const account_type_code = req.body.account_type_code;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_account_type tat with (nolock) WHERE account_type_code='${account_type_code}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {InsertAccountType,UpdateAccountName,TotalAccountName,AccountnameStatus,SelectAccountName}