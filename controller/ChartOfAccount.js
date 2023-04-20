const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");


const Accounttype = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT account_type,account_type_code from ${org}.dbo.tbl_account_type tat WHERE status='Active'`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}
const CountAccounttype = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select count(sno) as count from ilogsolution.dbo.tbl_account_type 
        `)
        res.send(result.recordset[0])
    } catch (err) {
        res.send(err)
    }
}

const ParentAccount = async (req, res) => {
    const org = req.body.org;
    const account_type_code = req.body.account_type_code;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT account_name,account_name_code from ${org}.dbo.tbl_account_name tan2 WHERE status='Active' and 
        account_type_code='${account_type_code}' order by sno desc;`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}
const ParentAccountNumber = async (req, res) => {
    const org = req.body.org;
    const account_type_code = req.body.account_type_code;
    const account_name_code = req.body.account_name_code;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT top 1 account_name_code from ${org}.dbo.tbl_account_name WHERE  account_type_code='${account_type_code}' order by sno desc;`)
        const result1 = await sql.query(`SELECT top 1  account_sub_name_code,account_sub_name from ${org}.dbo.tbl_sub_account WHERE  account_name_code='${account_name_code}' and account_type_code='${account_type_code}' order by sno desc;`)
        res.send({
            "result": result.recordset[0],
            "result1": result1.recordset[0],

        })
    }
    catch (err) {
        res.send(err)
    }
}

const AddAccountName = async (req, res) => {
    const account_type_code = req.body.account_type_code;
    const account_name = req.body.account_name;
    const account_name_code = req.body.account_name_code;
    const description = req.body.description;
    const org = req.body.org;
    const User_id = req.body.User_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into ${org}.dbo.tbl_account_name (account_type_code,account_name,account_name_code,account_description,add_user_name,
            add_system_name,add_ip_address ,add_date_time ,status ) values('${account_type_code}','${account_name}','${account_name_code}','${description}','${User_id}','${os.hostname()}','${req.ip}',
             getDate(),'Active');`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}

const AddSubAccountName = async (req, res) => {
    const account_type_code = req.body.account_type_code;
    const account_name_code = req.body.account_name_code;
    const org = req.body.org;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into ${org}.dbo.tbl_sub_account (account_type_code,account_name_code) 
            values('${account_type_code}','${account_name_code}');`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}

const AddNewSubAccountName = async (req, res) => {
    const account_sub_name = req.body.account_sub_name;
    const account_sub_name_code = req.body.account_sub_name_code;
    const description = req.body.description;
    const account_type_code = req.body.account_type_code;
    const account_name_code = req.body.account_name_code;
    const org = req.body.org;
    const User_id = req.body.User_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into ${org}.dbo.tbl_sub_account (account_type_code,account_name_code,account_sub_name,
            account_sub_name_code,account_description,add_user_name,add_system_name,add_ip_address ,add_date_time ,status ) 
            values('${account_type_code}','${account_name_code}','${account_sub_name}','${account_sub_name_code}','${description}','${User_id}','${os.hostname()}','${req.ip}',
             getDate(),'Active');
            `)
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
}


const SelectSubAccountname = async (req, res) => {
    const account_type_code = req.body.account_type_code;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select account_sub_name,account_sub_name_code from  ${org}.dbo.tbl_sub_account tsa with (nolock) WHERE account_name_code ='${account_type_code}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const SelectSubAcconameByType = async (req, res) => {
    const account_type = req.body.account_type;
    const org = req.body.org;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` select account_type_code from ${org}.dbo.tbl_account_type with (nolock) where account_type='${account_type}' and status='Active';`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}





module.exports = { Accounttype, ParentAccount, ParentAccountNumber, AddAccountName, AddSubAccountName,  AddNewSubAccountName, SelectSubAccountname, SelectSubAcconameByType,CountAccounttype }