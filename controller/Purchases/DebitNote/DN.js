const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");


const InsertDebitNote = async (req, res) => {
    const org = req.body.org;
    const dn_no = req.body.dn_no;
    const dn_date = req.body.dn_date;
    const total_dn_amt = req.body.total_dn_amt;
    const remark = req.body.remark;
    const bill_no = req.body.bill_no;
    const voucher_no = req.body.voucher_no;
    const user_id = req.body.user_id
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_debitnote (dn_no,dn_type,dn_date,total_dn_amt,remark,dn_source,bill_no,voucher_no,dn_flag,reqtoappr_date_time,reqtoappr_user_name,
            reqtoappr_system_name,reqtoappr_ip_address,status) values('${dn_no}','DR','${dn_date}','${total_dn_amt}','${remark}','DJ','${bill_no}','${voucher_no}','Waiting',getdate(),'${user_id}','${os.hostname()}',
            '${req.ip}','Active')`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateDebitNote = async (req, res) => {
    const org = req.body.org;
    const vend_id = req.body.vend_id;
    const bill_date = req.body.bill_date;
    const total_bill_amt = req.body.total_bill_amt;
    const net_amt = req.body.net_amt;
    const location = req.body.location;
    const total_gst_amt = req.body.total_gst_amt;
    const cgst_amt = req.body.cgst_amt;
    const sgst_amt = req.body.sgst_amt;
    const igst_amt = req.body.igst_amt;
    const tds_head = req.body.tds_head;
    const tds_amt = req.body.tds_amt;
    const tds_per = req.body.tds_per;
    const expense_amt = req.body.expense_amt;
    const fins_year = req.body.fins_year;
    const uuid = uuidv1();
    const dn_no = req.body.dn_no;
    const voucher_no = req.body.voucher_no;
    const user_id = req.body.user_id;
 
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`UPDATE ${org}.dbo.tbl_debitnote set vend_id='${vend_id}',bill_date='${bill_date}',total_bill_amt='${total_bill_amt}',net_amt='${net_amt}',
        location='${location}',total_gst_amt='${total_gst_amt}',cgst_amt='${cgst_amt}',sgst_amt='${sgst_amt}',igst_amt='${igst_amt}',tds_head='${tds_head}',
        tds_amt='${tds_amt}',tds_per='${tds_per}',expense_amt='${expense_amt}',fins_year='${fins_year}',newdn_uuid='${uuid}',add_date_time=getdate(),add_user_name='${user_id}'
        ,add_system_name='${os.hostname()}',add_ip_address='${req.ip}',dn_flag='Done' where dn_no ='${dn_no}'and voucher_no='${voucher_no}'`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}

const AllDNData = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),dn_date,121) as Joindate  from ilogsolution.dbo.tbl_debitnote  ORDER BY sno DESC`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const ChangeDNStatus = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_debitnote set dn_flag='${status}' where sno = ${sno} `)
        if(result.recordset.length>0){
            res.send('Updated')
        }
    }
    catch (err) {
        res.send(err)
    }
}

const getDNData = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),dn_date,121) as dn_Date from ${org}.dbo.tbl_debitnote where sno = ${sno} `)
        res.send(result.recordset[0]) 
    }
    catch (err) {
        res.send(err)
    }
}

const InsertSubDebitNote = async (req, res) => {
    const org = req.body.org;
    const dn_no = req.body.dn_no;
    const voucher_no = req.body.voucher_no;
    const bill_no = req.body.bill_no;
    const location = req.body.location;
    const items = req.body.items;
    const emp_name = req.body.emp_name;
    const glcode = req.body.glcode;
    const amt = req.body.amt;
    const fin_year = req.body.fin_year;
    const balance_amt = req.body.balance_amt;
    const pass_amt = req.body.pass_amt;
    const remark = req.body.remark;
    const user_id = req.body.user_id;
    const bill_sub_sno = req.body.bill_sub_sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_sub_debitnote(dn_no,voucher_no,bill_no,location,items,emp_name,glcode,amt,fin_year,
			balance_amt,pass_amt,remark,add_date_time,add_user_name,add_system_name,add_ip_address,status,bill_sub_sno)
			values('${dn_no}','${voucher_no}','${bill_no}','${location}','${items}','${emp_name}','${glcode}','${amt}','${fin_year}',
			'${balance_amt}','${pass_amt}','${remark}',getdate(),'${user_id}','${os.hostname()}','${req.ip}','Active','${bill_sub_sno}')`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}

const SelectDnSubDetails = async (req,res) => {
    const org = req.body.org;
    const dn_no= req.body.dn_no;
    const voucher_no = req.body.voucher_no;
    const topcount = req.body.topcount;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select Top ${topcount} * from ${org}.dbo.tbl_sub_debitnote where dn_no='${dn_no}' and voucher_no ='${voucher_no}' ORDER BY sno DESC`)
        res.send(result.recordset) 
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {InsertDebitNote,AllDNData,ChangeDNStatus,getDNData,UpdateDebitNote,InsertSubDebitNote,SelectDnSubDetails}