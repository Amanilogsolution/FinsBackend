const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const user = async (req, res) => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_usermaster order by sno desc`)
        res.send(result.recordset)
    } catch (err) {
        console.log(err)
    }
}

const InsertUser = async (req, res) => {
    const employee_name = req.body.employee_name;
    const role = req.body.role;
    const warehouse = req.body.warehouse;
    const username = req.body.username;
    const password = req.body.password;
    const email_id = req.body.email_id;
    const phone = req.body.phone;
    const operatemode = req.body.operatemode;
    const customer = req.body.customer;
    const reporting_to = req.body.reporting_to;
    const user_profile_url = req.body.user_profile_url;
    const designation = req.body.designation;
    // const user_profile_url = 'https://thispersondoesnotexist.com/image'
    const two_factor_authentication = req.body.two_factor_authentication;
    console.log(user_profile_url)
    const uuid = uuidv1()
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into FINSDB.dbo.tbl_usermaster (employee_name,role,warehouse,user_id,password,email_id,phone,operate_mode,status,customer,reporting_to,designation,two_factor_authentication,user_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,user_profile_url)
        values('${employee_name}','${role}','${warehouse}','${username}','${password}','${email_id}','${phone}','${operatemode}','Active','${customer}','${reporting_to}','${designation}','${two_factor_authentication}','${uuid}',getdate(),'admin','rupesh','${req.ip}','${user_profile_url}')`)
        res.send('Added')
    }
    catch (err) {
        console.log(err)
    }
}
async function showuser(req, res) {
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_usermaster where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        console.log(err)
    }
}

async function updateuser(req, res) {
    const sno = req.body.sno
    const employee_name = req.body.employee_name;
    const role = req.body.role;
    const warehouse = req.body.warehouse;
    const user_name = req.body.user_name;
    const password = req.body.password;
    const email_id = req.body.email_id;
    const phone = req.body.phone;
    const operate_mode = req.body.operate_mode;
    const customer = req.body.customer;
    const reporting_to = req.body.reporting_to;
    const designation = req.body.designation;
    const two_factor_authentication = req.body.two_factor_authentication;
    console.log(user_name)

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_usermaster set 
        employee_name='${employee_name}',role='${role}',
        warehouse='${warehouse}',user_id='${user_name}',
        password='${password}',email_id='${email_id}',phone='${phone}',
        operate_mode='${operate_mode}',customer='${customer}',reporting_to='${reporting_to}',
        designation='${designation}',two_factor_authentication='${two_factor_authentication}',
        update_date_time=getdate(),update_user_name='Admin',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' 
         where sno = ${sno}`)

        res.send('done')
    }
    catch (err) {
        console.log(err)
    }
}

async function deleteuser(req, res) {
    const sno = req.body.sno
    const status = req.body.status
    console.log(sno,status)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_usermaster set status='${status}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        console.log(err)
    }
}



const ImportUser = (req, res) => {
    const datas = req.body.data;
    const org=req.body.org;
    const org_name=req.body.org_name;
     console.log(datas)
    sql.connect(sqlConfig).then(() => {

        sql.query(`select * from FINSDB.dbo.tbl_usermaster where user_id in ('${datas.map(data => data.user_name).join("', '")}') OR email_id in ('${datas.map(data => data.email_id).join("', '")}') OR phone in ('${datas.map(data => data.phone).join(', ')}')`)
            .then((resp) => {
                console.log(resp.rowsAffected[0])
                if (resp.rowsAffected[0] > 0)
                    res.send(resp.recordset.map(item => ({ "user_id": item.user_name, "email_id": item.email_id, "phone": item.phone })))
                else {

                    sql.query(`INSERT into FINSDB.dbo.tbl_usermaster(employee_name,role,warehouse,user_id,password,
                    email_id,phone,operate_mode,customer,reporting_to,designation,
                    user_profile_url,two_factor_authentication,status,add_date_time,add_user_name,add_system_name,add_ip_address,user_uuid)
                    values ${datas.map(item => `('${item.employee_name}','${item.role}','${item.warehouse}','${item.user_name}','${item.password}','${item.email_id}',${item.phone},'${item.operate_mode}','${item.customer}',
                    '${item.reporting_to}','${item.designation}','${item.user_profile_url}','with otp','Active',getdate(),'Rupesh','${os.hostname()}','${req.ip}','${ uuidv1()}')`).join(',')}

                    insert into FINSDB.dbo.tbl_Login(user_id,user_name,location,comp_name,comp_ip,
                        user_password,login_uuid,org_name ,org_db_name,user_profile_url)
                        values ${datas.map(item => `('${item.user_name}','${item.employee_name}','','${org_name}','${req.ip}','${item.password}','${ uuidv1()}','${org_name}','${org}','${item.user_profile_url}')`).join(',')}`)
                    res.send("Data Added")
                }
            })
    })
}

async function UpdateImage(req, res) {
    const user_id = req.body.user_id;
    const user_profile_url = req.body.user_profile_url
    console.log(user_id,user_profile_url)
    try {
        await sql.connect(sqlConfig)
        const Login = await sql.query(`update FINSDB.dbo.tbl_Login set user_profile_url='${user_profile_url}' where user_id ='${user_id}'`)
        const User = await sql.query(`update FINSDB.dbo.tbl_usermaster set user_profile_url='${user_profile_url}' where user_id ='${user_id}';`)
     res.send(Login)
        
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { user, InsertUser, showuser, updateuser, deleteuser,ImportUser ,UpdateImage}