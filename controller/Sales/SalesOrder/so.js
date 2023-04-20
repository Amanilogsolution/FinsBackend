const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const InsertSalesorder = async (req, res) => {
    const org=req.body.org;
    const cust_id=req.body.cust_id;
    const cust_addressid = req.body.cust_addressid;
    const so_no = req.body.so_no;
    const so_date = req.body.so_date;
    const net_amt = req.body.net_amt;
    const gst_rate = req.body.gst_rate;
    const gst_amt = req.body.gst_amt;
    const total_amt = req.body.total_amt;
    const remark = req.body.remark;
    const User_id = req.body.User_id;
    const uuid = uuidv1()
    const flagsave = req.body.flagsave;
    console.log(`insert into ${org}.dbo.tbl_sales_order  (cust_id,cust_addressid,so_no,so_date,net_amt,gst_rate,gst_amt,total_amt,remark,add_date_time,add_user_name,add_system_name,add_ip_address,status,so_uuid,flagsave)
    values('${cust_id}','${cust_addressid}','${so_no}','${so_date}','${net_amt}','${gst_rate}','${gst_amt}','${total_amt}','${remark}',getDate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${uuid}','${flagsave}')`)

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query
            (`insert into ${org}.dbo.tbl_sales_order  (cust_id,cust_addressid,so_no,so_date,net_amt,gst_rate,gst_amt,total_amt,remark,add_date_time,add_user_name,add_system_name,add_ip_address,status,so_uuid,flagsave)
            values('${cust_id}','${cust_addressid}','${so_no}','${so_date}','${net_amt}','${gst_rate}','${gst_amt}','${total_amt}','${remark}',getDate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${uuid}','${flagsave}')`)
        res.send('Insert')
    }
    catch (err) {
        res.send(err)
    }
}

module.exports={InsertSalesorder}