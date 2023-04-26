const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const InsertSalesorder = async (req, res) => {
    const org = req.body.org;
    const cust_id = req.body.cust_id;
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
  

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query
            (`insert into ${org}.dbo.tbl_sales_order  (cust_id,cust_addressid,so_no,so_date,net_amt,gst_rate,gst_amt,total_amt,remark,add_date_time,add_user_name,add_system_name,add_ip_address,status,so_uuid,flagsave)
            values('${cust_id}','${cust_addressid}','${so_no}','${so_date}','${net_amt}','${gst_rate}','${gst_amt}','${total_amt}','${remark}',getDate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${uuid}','${flagsave}')`)

        if (result.rowsAffected[0] > 0) {
            res.send('Insert')
        }
        else {
            res.send('Error')
        }
    }
    catch (err) {
        res.send(err)
    }
}

const InsertSubSalesorder = async (req, res) => {
    const org = req.body.org;
    const so_no = req.body.so_no;
    const activity = req.body.activity;
    const item = req.body.item;
    const qty = req.body.qty;
    const rate = req.body.rate;
    const gst_rate = req.body.gst_rate;
    const gst_amt = req.body.gst_amt;
    const unit = req.body.unit;
    const net_amt = req.body.net_amt;
    const total_amt = req.body.total_amt;
    const User_id = req.body.User_id;
    const uuid = uuidv1()
    const glcode = req.body.glcode;
    const major_code = req.body.major_code;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query
            (`insert into ${org}.dbo.tbl_sub_sales_order (so_no,activity,item,qty,rate,gst_rate,gst_amt,unit,net_amt,total_amt,add_date_time,add_user_name,add_system_name,add_ip_address,status,sub_so_uuid,glcode,major_code)
            values('${so_no}','${activity}','${item}','${qty}','${rate}','${gst_rate}','${gst_amt}','${unit}','${net_amt}','${total_amt}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${uuid}','${glcode}','${major_code}')`)
        res.send("Insert")
    }
    catch (err) {
        res.send(err)
    }
}

const getSaveSO = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),so_date,121) as sodate from ${org}.dbo.tbl_sales_order with (nolock) where flagsave='Save' order by sno desc`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }

}

const getSoDetails = async (req, res) => {
    const org = req.body.org;
    const so_no = req.body.so_no;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),so_date,121) as sodate from ${org}.dbo.tbl_sales_order WHERE  so_no ='${so_no}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const getSubSoDetails = async (req, res) => {
    const org = req.body.org;
    const so_no = req.body.so_no;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_sub_sales_order WHERE  so_no ='${so_no}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const EditSalesOrder = async (req, res) => {
    const org = req.body.org;
    const new_so_num = req.body.new_so_num
    const so_no = req.body.so_no;
    const status = req.body.status;
    console.log(org, so_no, status)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`UPDATE ${org}.dbo.tbl_sales_order set flagsave='${status}',so_no='${new_so_num}' where so_no ='${so_no}' `)
        res.send("Updated")
    }
    catch (err) {
        res.send(err)
    }
}

const filterSO = async (req, res) => {
    const org = req.body.org;
    const startDate = req.body.startDate;
    const lastDate = req.body.lastDate;
    const cust_id = req.body.cust_id;
    const po_location = req.body.po_location;
    console.log(org,startDate,lastDate,cust_id)

    try {
        await sql.connect(sqlConfig)
        if (cust_id === 'all') {
            const result = await sql.query(`select *,convert(varchar(15),so_date,121) as Joindate from ${org}.dbo.tbl_sales_order tso where so_date between '${startDate}' and '${lastDate}' and flagsave='post'`)
            res.send(result.recordset)
        }
        else {
            const result = await sql.query(`select *,convert(varchar(15),so_date,121) as Joindate from ${org}.dbo.tbl_sales_order tso where so_date between '${startDate}' and '${lastDate}' and cust_id = '${cust_id}' and flagsave='post'`)
            res.send(result.recordset)
        }
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = { InsertSalesorder, getSaveSO, InsertSubSalesorder, getSoDetails, getSubSoDetails, EditSalesOrder,filterSO }