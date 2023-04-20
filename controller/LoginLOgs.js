const sql = require('mssql')
const sqlConfig = require('../config.js')
const jwt = require("jsonwebtoken")
const os = require('os')
const uuidv1 = require("uuid/v1");

const LoginLogs = async (req, res) => {
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    const comp_name = req.body.comp_name;
    const org_db_name = req.body.org_db_name;

    try {
        await sql.connect(sqlConfig)
        const Login = await sql.query(`update FINSDB.dbo.tbl_Login set comp_ip='${req.ip}',login_time=GETDATE(),status='Login'  WHERE user_id = '${user_id}'`)
        const result = await sql.query(`insert into FINSDB.dbo.tbl_login_logs(user_id,user_name,comp_name,org_db_name,login_time,status)
            values ('${user_id}','${user_name}','${comp_name}','${org_db_name}',GETDATE(),'Login')`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}

const LogoutLogs = async (req, res) => {
    const user_id = req.body.user_id;
    const org_db_name = req.body.org_db_name;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_login_logs  set logout_time =GETDATE(),status='Logout'
        WHERE org_db_name='${org_db_name}' and user_id ='${user_id}' and status ='Login';`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = { LoginLogs, LogoutLogs }