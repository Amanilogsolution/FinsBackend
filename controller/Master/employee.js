const sql =require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')

const TotalEmployee = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from  ${org}.dbo.tbl_emp`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}

const insertemployee = async (req, res) => {
    const org = req.body.org
    const emp_name = req.body.emp_name;
    const wh = req.body.wh;
    const emp_id = req.body.emp_id;
    const User_id= req.body.User_id;
 
    try {
        await sql.connect(sqlConfig)

        const result = await sql.query(`insert into ${org}.dbo.tbl_emp(emp_name,wh,emp_id,add_user_name ,add_system_name,add_ip_address,
            add_date_time,status ,emp_uuid )
            values('${emp_name}','${wh}','${emp_id}','${User_id}','${os.hostname()}','${req.ip}',getdate(),'Active','') 
          `)
        res.send('Added')  
    }
    catch (err) {
        res.send(err)
    }
}

const deleteEmployee = async (req, res) => {
    const org = req.body.org
    const sno = req.body.sno;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_emp set status='${status}' where sno='${sno}' `)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}

const getemployee = async (req,res) => {
    const org = req.body.org
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from   ${org}.dbo.tbl_emp WHERE sno='${sno}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }

}

const updateemployee = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org
    const emp_name = req.body.emp_name;
    const wh = req.body.wh;
    const emp_id = req.body.emp_id;
    const User_id= req.body.User_id;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_emp set emp_name ='${emp_name}',wh='${wh}',emp_id ='${emp_id}',update_user_name='${User_id}',
        update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=GETDATE()  WHERE sno= ${sno}`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}

module.exports={TotalEmployee,deleteEmployee,insertemployee,getemployee,updateemployee}