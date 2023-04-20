const sql = require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')

const InsertInvoice = async (req, res) => {
    const org = req.body.org;
    const fin_year = req.body.fin_year;
    const invoice_no = req.body.invoice_no;
    const squence_no = req.body.squence_no;
    const invoice_date = req.body.invoice_date;
    const order_no = req.body.order_no;
    const invoice_amt = req.body.invoice_amt;
    const user_id = req.body.user_id;
    const periodfrom = req.body.periodfrom;
    const periodto = req.body.periodto;
    const major = req.body.major;
    const location = req.body.location;
    const custid = req.body.custid;
    const billsubtotal = req.body.billsubtotal;
    const total_tax = req.body.total_tax;
    const cust_locationid = req.body.cust_locationid;
    const remark = req.body.remark;
    const flagsave = req.body.flagsave;
    const location_name = req.body.location_name;
    const consignee = req.body.consignee;
    const cust_family = req.body.cust_family;
    const cgst_amt = req.body.cgst_amt;
    const sgst_amt = req.body.sgst_amt;
    const utgst_amt = req.body.utgst_amt;
    const igst_amt = req.body.igst_amt;
    const taxable_amt = req.body.taxable_amt;
    const currency_type = req.body.currency_type;
    const sales_person = '';
    // const subject = req.body.subject;
    const payment_term = req.body.payment_term;
    const due_date = req.body.due_date;
    const User_id = req.body.User_id;
    const cust_location_addrs = req.body.custaddrs;
    const cust_location_gst = req.body.custAddgst;
    const destination = req.body.destination;
    const origin = req.body.origin;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_invoice(fin_year,invoice_no,squence_no ,invoice_date ,order_no ,invoice_amt,
            doe,user_id,periodfrom,periodto,major,location,custid,billsubtotal,total_tax,cust_locationid,cust_location_add,cust_location_gst,remark,flagsave ,
            location_name ,consignee ,cust_family,cgst_amt,sgst_amt,utgst_amt ,igst_amt,taxable_amt,currency_type,sales_person,payment_term,due_date,origin,destination,add_date_time,add_user_name ,add_system_name ,
            add_ip_address ,status)
            values('${fin_year}','${invoice_no}','${squence_no}','${invoice_date}','${order_no}','${invoice_amt}',getdate(),'${user_id}','${periodfrom}','${periodto}',
            '${major}','${location}','${custid}','${billsubtotal}','${total_tax}','${cust_locationid}','${cust_location_addrs}','${cust_location_gst}','${remark}','${flagsave}','${location_name}','${consignee}','${cust_family}',
            '${cgst_amt}','${sgst_amt}','${utgst_amt}','${igst_amt}','${taxable_amt}','${currency_type}','${sales_person}','${payment_term}','${due_date}','${origin}','${destination}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active')`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}

const filterInvoice = async (req, res) => {
    const org = req.body.org;
    const startDate = req.body.startDate;
    const lastDate = req.body.lastDate;
    const custid = req.body.custid;
    const locationid = req.body.locationid;
    try {
        await sql.connect(sqlConfig)
        if (custid === 'all') {
            const result = await sql.query(`select *,convert(varchar(15),invoice_date,121) as Joindate  from ${org}.dbo.tbl_invoice with (nolock) where convert(date,invoice_date) between '${startDate}' 
            and '${lastDate}' or location ='${locationid}' and flagsave='post' order by sno desc;`)
            res.send(result.recordset)
        }
        else {
            const result = await sql.query(`select *,convert(varchar(15),invoice_date,121) as Joindate  from ${org}.dbo.tbl_invoice with (nolock) where convert(date,invoice_date) between '${startDate}' 
            and '${lastDate}' and custid='${custid}' or location ='${locationid}' and flagsave='post' order by sno desc;`)
            res.send(result.recordset)
        }
    }
    catch (err) {
        res.send(err)
    }

}

const getInvoice = async (req, res) => {
    const org = req.body.org;
    const invoiceno = req.body.invoiceno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),invoice_date,121) as startdate,convert(varchar(15),due_date,121) as lastdate,
        convert(varchar(15),periodfrom,121) as periodfrom_date,convert(varchar(15),periodto,121) as periodto_date
         from ${org}.dbo.tbl_invoice with (nolock) where invoice_no='${invoiceno}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }

}

const getSaveInvoice = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),invoice_date,121) as Joindate ,convert(varchar(15),due_date,121) as lastdate from ${org}.dbo.tbl_invoice with (nolock) where flagsave='save' order by sno desc`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }

}

const UpdateSaveInvoiceToPost = async (req, res) => {
    const org = req.body.org;
    const invoice_no = req.body.invoice_no;
    const new_invoice_no = req.body.new_invoice_no;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` update ${org}.dbo.tbl_invoice set invoice_no='${new_invoice_no}' ,flagsave='post' WHERE invoice_no='${invoice_no}'`)
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

const GetInvoicesByCustomer = async (req, res) => {
    const org = req.body.org;
    const customer_id = req.body.customer_id;
    console.log(org, customer_id)
    
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ilogsolution.dbo.tbl_invoice where custid = 'CUST230001' and flagsave = 'post'`)
        res.send(result.recordset)

    }
    catch (err) {
        res.send(err)
    }

}

const filterInvoicebyCN = async (req, res) => {
    const org = req.body.org;
    const startDate = req.body.startDate;
    const lastDate = req.body.lastDate;
    const custid = req.body.custid;
    const locationid = req.body.locationid;
    const invoice_no = req.body.invoice_no;
    try {
        await sql.connect(sqlConfig)
        if (custid === 'all') {
            const result = await sql.query(`select *,convert(varchar(15),invoice_date,121) as Joindate  from ${org}.dbo.tbl_invoice with (nolock) where convert(date,invoice_date) between '${startDate}' 
            and '${lastDate}' or location ='${locationid}' or invoice_no='${invoice_no}' and flagsave='post' order by sno desc;`)
            res.send(result.recordset)
        }
        else {
            const result = await sql.query(`select *,convert(varchar(15),invoice_date,121) as Joindate  from ${org}.dbo.tbl_invoice with (nolock) where convert(date,invoice_date) between '${startDate}' 
            and '${lastDate}' and custid='${custid}' or location ='${locationid}' or invoice_no='${invoice_no}' and flagsave='post' order by sno desc;`)
            res.send(result.recordset)
        }
    }
    catch (err) {
        res.send(err)
    }

}

module.exports = { InsertInvoice, filterInvoice, getInvoice, getSaveInvoice, UpdateSaveInvoiceToPost,GetInvoicesByCustomer,filterInvoicebyCN }