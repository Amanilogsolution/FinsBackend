const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

const user = async (req, res) => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_usermaster order by sno desc`)
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
    const designation = req.body.designation;
    const two_factor_authentication = req.body.two_factor_authentication;


    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into tbl_usermaster (employee_name,role,warehouse,user_name,password,email_id,phone,operate_mode,status,customer,reporting_to,designation,two_factor_authentication,add_date_time,add_user_name,add_system_name,add_ip_address)
        values('${employee_name}','${role}','${warehouse}','${username}','${password}','${email_id}','${phone}','${operatemode}','Active','${customer}','${reporting_to}','${designation}','${two_factor_authentication}',getdate(),'admin','rupesh','${req.ip}')`)
        res.send('Added')
    }
    catch(err){
        console.log(err)
    }
}
async function showuser(req,res){
    const sno = req.body.sno
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_usermaster where sno = ${sno}`)
        res.send(result.recordset[0])
        }
        catch(err){
            console.log(err)
            }
          }

async function updateuser(req,res){
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

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_usermaster set 
        employee_name='${employee_name}',role='${role}',
        warehouse='${warehouse}',user_name='${user_name}',
        password='${password}',email_id='${email_id}',phone='${phone}',
        operate_mode='${operate_mode}',customer='${customer}',reporting_to='${reporting_to}',
        designation='${designation}',two_factor_authentication='${two_factor_authentication}',
        update_date_time=getdate(),update_user_name='Admin',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' 
         where sno = ${sno}`)

        res.send('done')
        }
        catch(err){
            console.log(err)
            }
              }

async function deleteuser(req,res){
    const sno = req.body.sno
    const status = req.body.status
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_usermaster set status='${status}' where sno = ${sno}`)
        res.send('done')
        }
        catch(err){
            console.log(err)
            }
         }

    
module.exports={user,InsertUser,showuser,updateuser,deleteuser}