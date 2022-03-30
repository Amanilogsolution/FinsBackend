const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

const InsertBank = async (req, res) => {
    // const bank_id = req.body.bank_id;
    const account_code = req.body.account_code;
    const bank_name = req.body.bank_name;
    const account_no = req.body.account_no;
    const address_line1 = req.body.address_line1;
    const address_line2 = req.body.address_line2;
    // const branch = req.body.branch;
    const state = req.body.state;
    const city = req.body.city;
    const pincode = req.body.pincode;
    const ifsc_code = req.body.ifsc_code;
    // const glcode = req.body.glcode;
    const actype = req.body.actype;
    const acname = req.body.acname;
    // const company_id = req.body.company_id;
    const description = req.body.description;
    console.log(req.body)
try{
    await sql.connect(sqlConfig)
    const result = await sql.query(`insert into tbl_bankmaster (account_code,bank_name,account_no,address_line1,address_line2,state,city,pincode,ifsc_code,description,status,ac_type,acname,add_date_time,add_user_name,add_system_name,add_ip_address)
                    values('${account_code}','${bank_name}','${account_no}','${address_line1}','${address_line2}','${state}','${city}','${pincode}','${ifsc_code}','${description}','Active','${actype}','${acname}',getdate(),'Aman','${os.hostname()}','${req.ip}')`)
    res.send('Added')
}
catch(err){
    console.log(err)
    }
}

const TotalBanks = async (req, res) => {
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from tbl_bankmaster`)
        res.send(result.recordset)
    }
    catch(err){
        console.log(err)
        }
    }

const DeleteBank = async (req, res) => {
    const sno = req.body.sno;
    const status = req.body.status;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_bankmaster set status='${status}' where sno='${sno}'`)
        res.send('Deleted')
    }
    catch(err){
        console.log(err)
        }
    }

    const ShowBank = async (req, res) => {
        const sno = req.body.sno
        try{
            await sql.connect(sqlConfig)
            const result = await sql.query(`select * from tbl_bankmaster where sno = ${sno}`)
            res.send(result.recordset[0])
        }
        catch(err){
            console.log(err)
            }
        }
 const UpdateBank = async (req, res) => {
    const sno = req.body.sno;
    const account_code = req.body.account_code;
    const bank_name = req.body.bank_name;
    const account_no = req.body.account_no;
    const address_line1 = req.body.address_line1;
    const address_line2 = req.body.address_line2;
    const state = req.body.state;
    const city = req.body.city;
    const pincode = req.body.pincode;
    const ifsc_code = req.body.ifsc_code;
    const type = req.body.type;
    const acname = req.body.acname;
    const description = req.body.description;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_bankmaster set account_code='${account_code}',bank_name='${bank_name}',account_no='${account_no}',address_line1='${address_line1}',address_line2='${address_line2}',state='${state}',city='${city}',pincode=${pincode},ifsc_code='${ifsc_code}',ac_type='${type}',acname='${acname}',description='${description}',update_date_time=getdate(),update_user_name='Rupesh',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno='${sno}'`)
        res.send('Updated')
    }
    catch(err){
        console.log(err)
        }
    }



module.exports = {InsertBank,TotalBanks,DeleteBank,ShowBank,UpdateBank}