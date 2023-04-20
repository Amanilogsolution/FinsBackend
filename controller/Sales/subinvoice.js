const sql = require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')

const InsertSubInvoice = async (req, res) => {
    const org = req.body.org;
    const fin_year = req.body.fin_year;
    const invoice_no = req.body.invoice_no;
    const major = req.body.major;
    const minor = req.body.minor;
    const revgl_code = req.body.revgl_code;
    const billing_code = req.body.billing_code;
    const quantity = req.body.quantity;
    const rate = req.body.rate;
    const unit = req.body.unit;
    const amount = req.body.amount;
    const consignee = req.body.consignee;
    const city = req.body.city;
    const custid = req.body.custid;
    const cust_locationid = req.body.cust_locationid;
    const taxable = req.body.taxable;
    const cgst_rate = req.body.cgst_rate;
    const sgst_rate = req.body.sgst_rate;
    const utgst_rate = req.body.utgst_rate;
    const igst_rate = req.body.igst_rate;
    const cgst_amt = req.body.cgst_amt;
    const sgst_amt = req.body.sgst_amt;
    const utgst_amt = req.body.utgst_amt;
    const igst_amt = req.body.igst_amt;
    const taxableamt = req.body.taxableamt;
    const User_id = req.body.User_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_subinvoice(fin_year,invoice_no ,major,minor,revgl_code,billing_code,quantity,
            rate,unit,amount,consignee,city,custid,cust_locationid,taxable,cgst_rate,sgst_rate,utgst_rate ,
            igst_rate ,cgst_amt ,sgst_amt ,utgst_amt ,igst_amt,add_date_time ,add_user_name ,add_system_name ,add_ip_address,status,taxableamount)
            values ('${fin_year}','${invoice_no}','${major}','${minor}','${revgl_code}','${billing_code}','${quantity}','${rate}','${unit}','${amount}','${consignee}','${city}',
            '${custid}','${cust_locationid}','${taxable}','${cgst_rate}','${sgst_rate}','${utgst_rate}','${igst_rate}','${cgst_amt}','${sgst_amt}','${utgst_amt}','${igst_amt}',getdate(),'${User_id}','${req.ip}','${os.hostname()}','Active',${taxableamt})`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}

const getSubInvoice = async (req, res) => {
    const org = req.body.org;
    const invoiceno = req.body.invoiceno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_subinvoice with (nolock) where invoice_no='${invoiceno}'`)
        res.send(result.recordset)


    }
    catch (err) {
        res.send(err)
    }

}


const UpdateSaveSubInvoiceToPost = async (req, res) => {
    const org = req.body.org;
    const invoice_no = req.body.invoice_no;
    const new_invoice_no = req.body.new_invoice_no;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` update ${org}.dbo.tbl_subinvoice set invoice_no='${new_invoice_no}'  WHERE invoice_no='${invoice_no}'`)
        if (result.rowsAffected > 0) {
            res.send('Updated')
        }
        else {
            res.send('Error')
        }
    }
    catch (err) {
        res.send(err)
    }

}

module.exports = { InsertSubInvoice, getSubInvoice, UpdateSaveSubInvoiceToPost }
