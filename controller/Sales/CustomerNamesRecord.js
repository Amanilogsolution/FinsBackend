const sql = require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')
const { request } = require('http')
const uuidv1 = require("uuid/v1");

const AddCustomerRecord = async (req, res) => {
    const org = req.body.org;
    const cust_id = req.body.cust_id;
    const cust_name = req.body.cust_name;
    const date = req.body.date;
    const user_id = req.body.user_id;
    const uuid = uuidv1()

    try {
        const result = await sql.query(`insert into ${org}.dbo.cust_name_recoard(cust_id,cust_name,created_date,add_ip_address,add_user_name,add_system_name,add_date_time,cust_name_uuid)
        values('${cust_id}','${cust_name}','${date}','${req.ip}','${user_id}','${os.hostname()}',getdate(),'${uuid}')    `)

        res.send(result.rowsAffected)
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateCustomerName = async (req, res) => {
    const org = req.body.org;
    const cust_name = req.body.cust_name;
    const cust_id = req.body.cust_id;
    console.log(`UPDATE ${org}.dbo.tbl_new_customer SET cust_name='${cust_name}'WHERE cust_id=${cust_id}`)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` UPDATE ${org}.dbo.tbl_new_customer SET cust_name='${cust_name}'WHERE cust_id='${cust_id}'`)
        res.send('Updated')
    } catch (err) {
        res.send(err)
    }
}

module.exports = {AddCustomerRecord,UpdateCustomerName}