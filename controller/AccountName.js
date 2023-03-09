const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const InsertAccountType = async (req, res) => {
    const org = req.body.org;
    const account_type = req.body.account_type;
    const account_type_code = req.body.account_type_code;
    const accountTypedesc= req.body.accountTypedesc;
    const User_id = req.body.User_id;

    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from ${org}.dbo.tbl_account_type where account_type_code='${account_type_code}' OR account_type='${account_type}'`)
        if (!duplicate.recordset.length) {
        const result = await sql.query(`INSERT into ${org}.dbo.tbl_account_type (account_type,account_type_code,account_description,add_user_name,add_system_name,
            add_ip_address ,add_date_time ,status ) values('${account_type}','${account_type_code}','${accountTypedesc}','${User_id}','${os.hostname()}','${req.ip}',getDate(),'Active');`)
        res.send('Added')
        } else {
            res.send("Already")
        }
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateAccountName = async (req, res) => {
    const account_type = req.body.account_type;
    const account_type_code = req.body.account_type_code;
    const org = req.body.org;
    const uniqueID = req.body.uniqueID
    const User_id = req.body.User_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_account_type set account_type='${account_type}',account_type_code ='${account_type_code}',update_user_name='${User_id}',
        update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=GETDATE()
        WHERE account_type_code='${uniqueID}'`)
        res.send('Updated')
    }
    catch(err){
       res.send(err)
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


const ImportAccountName = (req, res) => {
    const datas = req.body.datas;
    const org = req.body.org;
    const User_id = req.body.User_id;

    sql.connect(sqlConfig).then(() => {

        sql.query(`select * from ${org}.dbo.tbl_account_type where account_type_code in ('${datas.map(data => data.account_type_code).join("', '")}') OR account_type in ('${datas.map(data => data.account_type).join("', '")}')`)
            .then((resp) => {
                if (resp.rowsAffected[0] > 0)
                    res.send(resp.recordset.map(item => ({ "account_type_code": item.account_type_code, "account_type": item.account_type})))
                else {
                    sql.query(`insert into  ${org}.dbo.tbl_account_type (account_type,account_type_code,account_description,add_user_name,add_system_name,
                    add_ip_address ,add_date_time ,status ) 
                    VALUES ${datas.map(item => `('${item.account_type}','${item.account_type_code}','${item.account_description}','${User_id}','${os.hostname()}','${req.ip}',getdate(),'Active')`).join(', ')}`)
                    res.send("Data Added")
                }
            })


    })
}

const ActiveAccountName = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select account_type,account_type_code from ${org}.dbo.tbl_account_type with (nolock) where status = 'Active'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {InsertAccountType,UpdateAccountName,TotalAccountName,AccountnameStatus,SelectAccountName,ImportAccountName,ActiveAccountName}