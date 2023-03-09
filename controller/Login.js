const sql = require('mssql')
const sqlConfig = require('../config.js')
const jwt = require("jsonwebtoken")
const os = require('os')
const uuidv1 = require("uuid/v1");


const User_login = async (req, res) => {
    const user_id = req.body.user_id;
    const user_password = req.body.user_password;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_Login with (nolock) where user_id='${user_id}' and user_password = '${user_password}'`)
        const result1 = await sql.query(`select fin_year,year,financial_year_lock  from ilogsolution.dbo.tbl_fin_year tfy with (nolock) where status='Active'`)

        if (result.recordset.length) {
            // const Login = await sql.query(`update FINSDB.dbo.tbl_Login set comp_ip='${req.ip}',login_time=GETDATE(),status='Login'  WHERE user_id = '${user_id}'`)
            const token = jwt.sign({ user_id, user_password }, process.env.JWT_KEY, { expiresIn: 5 * 24 * 60 * 60 })
            res.status(200).send({
                status: "Success",
                token: token,
                org_db_name: result.recordset[0].org_db_name,
                user_name: result.recordset[0].user_name,
                org_name: result.recordset[0].org_name,
                user_id: result.recordset[0].user_id,
                image: result.recordset[0].user_profile_url,
                number: result.recordset[0].phone_no,
                user_ip: result.recordset[0].comp_ip,
                fin_year: result1.recordset[0].fin_year,
                year: result1.recordset[0].year,
                fin_year_status: result1.recordset[0].financial_year_lock,
                Twofa: result.recordset[0].tfact_secretkey,
                Loginstatus: result.recordset[0].status,
                ThemeButton: result.recordset[0].theme_btn_color,
                Theme: result.recordset[0].theme_type,
                UserRole: result.recordset[0].UserRole,
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
        res.send(err)

    }
}


const InsertUserLogin = async (req, res) => {
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    const location = req.body.location;
    const comp_name = req.body.comp_name;
    const user_password = req.body.user_password;
    const org_db_name = req.body.org_db_name;
    const user_profile_url = req.body.user_profile_url;
    const UserRole = req.body.UserRole

    const uuid = uuidv1()

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into FINSDB.dbo.tbl_Login(user_id,user_name,location,comp_name,comp_ip,
            user_password,login_uuid,org_name ,org_db_name,user_profile_url,UserRole)
            values ('${user_id}','${user_name}','${location}','${comp_name}','${req.ip}','${user_password}','${uuid}','${comp_name}','${org_db_name}','${user_profile_url}','${UserRole}')`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}

const User_logout = async (req, res) => {
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    const btntheme = req.body.btntheme;
    const themetype = req.body.themetype;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_Login set logout_time=GETDATE(),status='Logout',
        theme_btn_color='${btntheme}',theme_type='${themetype}'  WHERE user_id = '${user_id}' and user_name = '${user_name}'`)
        res.status(200).send({
            status: "Logout"
        })
    }
    catch (err) {
        res.send(err)
    }
}

async function showLoginuser(req, res) {
    const user_id = req.body.user_id
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_usermaster with (nolock) where user_id = '${user_id}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

async function ChangePassword(req, res) {
    const user_id = req.body.user_id;
    const password = req.body.password;
    const CurrentPassword = req.body.CurrentPassword;

    try {
        await sql.connect(sqlConfig)
        const checkpass = await sql.query(`select user_password from FINSDB.dbo.tbl_Login with (nolock) where user_id = '${user_id}' and user_password='${CurrentPassword}'`)
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
        res.send(err)
    }
}

module.exports = { User_login, User_logout, InsertUserLogin, showLoginuser, ChangePassword }