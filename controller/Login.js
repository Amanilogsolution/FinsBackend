const sql = require('mssql')
const sqlConfig = require('../config.js')
const jwt = require("jsonwebtoken")
const os = require('os')
const uuidv1 = require("uuid/v1");


const User_login = async (req, res) => {
    const user_id = req.body.user_id;
    const user_password = req.body.user_password;
    // console.log(user_id,user_password)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_Login where user_id='${user_id}' and user_password = '${user_password}'`)
        if (result.recordset.length) {
            const Login = await sql.query(`update FINSDB.dbo.tbl_Login set comp_ip='${req.ip}',login_time=GETDATE(),status='Login'  WHERE user_id = '${user_id}'`)
            const token = jwt.sign({ user_id, user_password }, process.env.JWT_KEY, { expiresIn: 5 * 24 * 60 * 60 })
            res.status(200).send({
                status: "Success",
                token: token,
                result: result.recordset[0].org_db_name,
                result2: result.recordset[0].user_name,
                result3: result.recordset[0].org_name,
                result4: result.recordset[0].user_id,
                result5: result.recordset[0].user_profile_url,

                expiresIn: 5 * 24 * 60 * 60
            })
        } else {
            res.send({
                status: "Fail",
                statusCode: "400",
                message: "Invalid ID and Password"
            })
        }
    } catch (err) {
        console.log(err)

    }
}


const InsertUserLogin = async (req, res) => {
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    const location = req.body.location;
    const comp_name = req.body.comp_name;
    const user_password = req.body.user_password;
    const org_db_name = req.body.org_db_name;
    const user_profile_url = req.body.user_profile_url
    console.log(user_profile_url)

    const uuid = uuidv1()

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into FINSDB.dbo.tbl_Login(user_id,user_name,location,comp_name,comp_ip,
            user_password,login_uuid,org_name ,org_db_name,user_profile_url)
            values ('${user_id}','${user_name}','${location}','${comp_name}','${req.ip}','${user_password}','${uuid}','${comp_name}','${org_db_name}','${user_profile_url}')`)
        res.send('Added')
    }
    catch (err) {
        console.log(err)
    }
}

const User_logout = async (req, res) => {
    const user_id = req.body.user_id;
    console.log(user_id)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_Login set logout_time=GETDATE(),status='Logout'  WHERE user_name = '${user_id}'`)
        res.status(200).send({
            status: "Logout"
        })
    }
    catch (err) {
        console.log(err)
    }
}

async function showLoginuser(req, res) {
    const user_id = req.body.user_id
    console.log(user_id)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_usermaster where user_id = '${user_id}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        console.log(err)
    }
}

async function ChangePassword(req, res) {
    const user_id = req.body.user_id;
    const password = req.body.password;
    const CurrentPassword = req.body.CurrentPassword;

    console.log(user_id, CurrentPassword)
    try {
        await sql.connect(sqlConfig)
        const checkpass = await sql.query(`select user_password from FINSDB.dbo.tbl_Login where user_id = '${user_id}' and user_password='${CurrentPassword}'`)
        if ((checkpass.recordset).length === 0) {
             res.send('Incorrect Current Password')
        }
        else {
            const UserChange = await sql.query(`update FINSDB.dbo.tbl_usermaster set password='${password}' where user_id ='${user_id}' and password='${CurrentPassword}'`)
            const LoginChange = await sql.query(`update FINSDB.dbo.tbl_Login set user_password ='${password}' where user_id ='${user_id}' and user_password='${CurrentPassword}'`)
            res.send(UserChange) 
        }


    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { User_login, User_logout, InsertUserLogin, showLoginuser, ChangePassword }