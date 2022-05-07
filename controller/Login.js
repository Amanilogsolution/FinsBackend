const sql =require('mssql')
const sqlConfig = require('../config.js')
const jwt = require("jsonwebtoken")
const os = require('os')
// const uuidv1 = require("uuid/v1");


const User_login = async (req,res) => {
    const user_id = req.body.user_id;
    const user_password = req.body.user_password;
    console.log(user_id,user_password)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_Login where user_id='${user_id}' and user_password = '${user_password}'`)
        if(result.recordset.length){
            const Login = await sql.query(`update FINSDB.dbo.tbl_Login set comp_ip='${req.ip}',login_time=GETDATE(),status='Login'  WHERE user_id = '${user_id}'`) 
           const token = jwt.sign({user_id,user_password},process.env.JWT_KEY,{ expiresIn: 60 })
            res.status(200).send({
                status:"Success",
                token:token,
                result:result.recordset[0].org_name,
                expiresIn:  60
            })
        }else{
            res.send({
                status:"Fail",
                statusCode:"400",
                message:"No user with this userID"
              })        
            }
    }catch(err){
        console.log(err)

    }
}

const User_logout = async(req,res)=>{
    const user_id = req.body.user_id;
    console.log(user_id)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_Login set logout_time=GETDATE(),status='Logout'  WHERE user_id = '${user_id}'`)
        res.status(200).send({
            status:"Logout"
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {User_login,User_logout}