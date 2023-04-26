const sql = require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')

const InsertCreditNote = async (req, res) => {
    const org = req.body.org;
    const cn_no = req.body.cn_no;
    const cn_date = req.body.cn_date;
    const mast_id = req.body.mast_id;
    const cust_id = req.body.cust_id;
    const inv_no = req.body.inv_no;
    const inv_date = req.body.inv_date;
    const total_amt = req.body.total_amt;
    const net_amt = req.body.net_amt;
    const remark = req.body.remark;
    const location = req.body.location;
    const fins_year = req.body.fins_year;
    const userid = req.body.userid;
    const total_cn_amt = req.body.total_cn_amt
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_creditnote (cn_no,cn_type,cn_date,mast_id,
            cust_id,inv_no,inv_date,total_amt,net_amt,remark,location,cn_flag,fins_year,reqtoappr_date_time,
            reqtoappr_user_name,reqtoappr_system_name,reqtoappr_ip_address,status,total_cn_amt)
            values('${cn_no}','CR','${cn_date}','${mast_id}',
            '${cust_id}','${inv_no}','${inv_date}','${total_amt}','${net_amt}','${remark}','${location}','1','${fins_year}',getdate(),'${userid}',
            '${os.hostname()}','${req.ip}','Waiting','${total_cn_amt}')`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}

const AllCNData = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),inv_date,121) as Joindate  from ilogsolution.dbo.tbl_creditnote where status='Confirmed' OR status='Waiting' order by sno desc`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const ChangeCNStatus = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    console.log(`update ${org}.dbo.tbl_creditnote set status='${status}' where sno = ${sno}`)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_creditnote set status='${status}' where sno = ${sno} `)
        if (result.recordset.length > 0) {
            res.send('Updated')
        }
    }
    catch (err) {
        res.send(err)
    }
}

const getCNData = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),inv_date,121) as inv_Date,convert(varchar(15),cn_date,121) as cndate from ${org}.dbo.tbl_creditnote where sno = ${sno} `)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

const InsertCnSub = async (req, res) => {
    const org = req.body.org
    const data = req.body.data
    const userid = req.body.userid
    const remark = req.body.remark

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_sub_creditnote (cn_no,invoice_no,activity,items,amt,balance_amt,pass_amt,
            remark,add_date_time,add_user_name,add_system_name,add_ip_address,status,sub_inv_id)
            values('${data.cn_no}','${data.invoice_no}','${data.activity}','${data.item}','${data.amount}','${data.balance_amt}','${data.pass_amt}',
            '${remark}',getdate(),'${userid}','${os.hostname()}','${req.ip}','Active','${data.sub_id}')`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}
const SelectCnSubDetails = async (req, res) => {
    const org = req.body.org;
    const cn_no = req.body.cn_no;
    const inv_no = req.body.inv_no;
    const topcount = req.body.topcount;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select Top ${topcount} * from ${org}.dbo.tbl_sub_creditnote where invoice_no ='${inv_no}' ORDER BY sno DESC  `)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const filterCN = async (req, res) => {
    const org = req.body.org;
    const startDate = req.body.startDate;
    const lastDate = req.body.lastDate;
    const custid = req.body.custid;
    const locationid = req.body.locationid;
    try {
        await sql.connect(sqlConfig)
        if (custid === 'all') {
            const result = await sql.query(`select *,convert(varchar(15),cn_date,121) as Joindate   from ${org}.dbo.tbl_creditnote with (nolock) where cn_date between '${startDate}' 
            and '${lastDate}' or location ='${locationid}'  order by sno desc;`)
            res.send(result.recordset)
        }
        else {
            const result = await sql.query(`select *,convert(varchar(15),cn_date,121) as Joindate   from ${org}.dbo.tbl_creditnote with (nolock) where cn_date between '${startDate}' 
            and '${lastDate}' and cust_id = '${custid}' or location ='${locationid}'  order by sno desc;`)
            res.send(result.recordset)
        }
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = { InsertCreditNote, AllCNData, ChangeCNStatus, getCNData, InsertCnSub, SelectCnSubDetails,filterCN }