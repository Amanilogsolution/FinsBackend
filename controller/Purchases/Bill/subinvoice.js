const sql =require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");


const inserSubInvoice = async (req, res) => {
    const org = req.body.org
    const voucher_no = req.body.voucher_no;
    const voucher_date = req.body.voucher_date;
    const bill_date = req.body.bill_date;
    const bill_no = req.body.bill_no;
    const vend_id = req.body.vend_id;
    const vend_name= req.body.vend_name;
    const location = req.body.location;
    const item_name = req.body.item_name;
    const emp_name= req.body.emp_name;
    const glcode = req.body.glcode;
    const samt= req.body.samt;
    const qty = req.body.qty;
    const rate= req.body.rate;
    const amt= req.body.amt;
    const unit= req.body.unit;
    const file_no= req.body.file_no;
    const deduction = req.body.deduction;
    const gst_rate= req.body.gst_rate;
    const sac_hsn = req.body.sac_hsn;
    const net_amt = req.body.net_amt;
    const remarks = req.body.remarks;
    const cost_centre = req.body.cost_centre;
    const fin_year = req.body.fin_year;
    const userid = req.body.userid;

    try {
        await sql.connect(sqlConfig)

        const result = await sql.query(`insert into ${org}.dbo.tbl_sub_bill(
            voucher_no ,voucher_date ,
         bill_date  ,bill_no ,
         vend_id ,vend_name ,
         location,item_name,
         emp_name ,glcode ,
         samt ,qty ,
         rate ,amt ,
         unit ,file_no ,
         deduction ,gst_rate,
         sac_hsn ,net_amt ,
         remarks,cost_centre ,
         fin_year,add_user_name ,
         add_system_name ,add_ip_address ,
         add_date_time,status,sub_bill_uuid  
         )
         values ('${voucher_no}','${voucher_date}','${bill_date}','${bill_no}','${vend_id}','${vend_name}','${location}','${item_name}','${emp_name}','${glcode}',
         '${samt}','${qty}','${rate}','${amt}','${unit}','${file_no}','${deduction}','${gst_rate}','${sac_hsn}','${net_amt}','${remarks}','${cost_centre}',
         '${fin_year}','${userid}','${os.hostname()}','${req.ip}',getDate(),'Active','${uuidv1()}')`)
        res.send('Added')  
    }
    catch (err) {
        res.send(err)
    }
}

module.exports={inserSubInvoice}