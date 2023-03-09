const sql = require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const Showcompliances = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select sno,compliance_type,nature,period,period_name,convert(varchar(15),from_month,121) as from_month,convert(varchar(15),to_month,121) as to_month,from_applicable,convert(varchar(15),due_date,121) as due_date,convert(varchar(15),extended_date,121) as extended_date,status  from ${org}.dbo.tbl_compliance with (nolock) order by sno desc`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)

    }
}

const Insertcompliance = async (req, res) => {
    const org = req.body.org;
    const compliance_type = req.body.compliance_type;
    const nature = req.body.nature;
    const period = req.body.period;
    const period_name = req.body.period_name;
    const from_month = req.body.from_month;
    const to_month = req.body.to_month;
    const from_applicable = req.body.from_applicable;
    const due_date = req.body.due_date;
    const extended_date = req.body.extended_date;
    const user_name = req.body.user_name
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_compliance (compliance_type ,nature,period ,period_name ,from_month,to_month ,
            from_applicable ,due_date ,extended_date ,add_date_time ,add_user_name ,add_system_name ,
            add_ip_address ,status,document_status )
            values('${compliance_type}','${nature}','${period}','${period_name}','${from_month}','${to_month}',
             '${from_applicable}','${due_date}','${extended_date}',getDate(),'${user_name}','${os.hostname()}','${req.ip}','Active','false')`);
        res.send(result)
    }
    catch (err) {
        res.send(err)

    }

}

const ShowcompliancesData = async (req, res) => {
    const org = req.body.org
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select compliance_type,nature,period,period_name,convert(varchar(15),from_month,121) as from_month,convert(varchar(15),to_month,121) as to_month,from_applicable,convert(varchar(15),due_date,121) as due_date,convert(varchar(15),extended_date,121) as extended_date,status  from ${org}.dbo.tbl_compliance with (nolock) where sno=${sno}`)
        res.send(result.recordset[0])
    } catch (err) {
        res.send(err)

    }
}

const Updatecompliance = async (req, res) => {
    const org = req.body.org;
    const compliance_type = req.body.compliance_type;
    const nature = req.body.nature;
    const period = req.body.period;
    const period_name = req.body.period_name;
    const from_month = req.body.from_month;
    const to_month = req.body.to_month;
    const from_applicable = req.body.from_applicable;
    const due_date = req.body.due_date;
    const extended_date = req.body.extended_date;
    const sno = req.body.sno;
    const user_name = req.body.user_name

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` update ${org}.dbo.tbl_compliance set compliance_type='${compliance_type}',nature='${nature}',period='${period}',period_name='${period_name}',from_month='${from_month}',
        to_month='${to_month}',from_applicable='${from_applicable}',due_date='${due_date}',extended_date='${extended_date}',update_date_time =GETDATE(),update_user_name ='${user_name}',
        update_system_name ='${os.hostname()}',update_ip_address='${req.ip}' WHERE sno=${sno};`);
        res.send(result)
    }
    catch (err) {
        res.send(err)

    }

}
const Compliancestatus = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_compliance set status='${status}' where sno = ${sno}`)
        res.send(result.recordset)
    }
    catch (err) {
        res.status(err)
    }
}


const Compliancesduedate = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select convert(varchar(15),due_date,121) as due_date  from ${org}.dbo.tbl_compliance with (nolock) where status='Active'`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }

}
const PendingCompliances = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select sno,compliance_type,period,document_status,remark,convert(varchar(15),due_date,121) as due_date  from ${org}.dbo.tbl_compliance with (nolock) where status='Active' `)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }

}

const UpdatePendingCompliances = async (req, res) => {
    const due_date = req.body.due_date
    const org = req.body.org;
    const remark = req.body.remark;
    const sno = req.body.sno;
    const UploadLink = req.body.UploadLink
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_compliance set due_date='${due_date}',remark='${remark}',document_url='${UploadLink}',document_status='true' where sno=${sno}`)
        res.status(200).send(result)
    }
    catch (err) {
        res.send(err)
    }

}


const ImportCompliances = (req, res) => {
    const datas = req.body.datas;
    const org = req.body.org;
    const User_id = req.body.User_id;

    sql.connect(sqlConfig).then(() => {

        sql.query(`insert into ${org}.dbo.tbl_compliance (compliance_type ,nature,period ,period_name ,from_month,to_month ,
            from_applicable ,due_date ,extended_date ,add_date_time ,add_user_name ,add_system_name ,
            add_ip_address ,status,document_url,document_status,remark) 
                    VALUES ${datas.map(item => `('${item.compliance_type}','${item.nature}','${item.period}','${item.period_name}',
                    '${item.from_month}','${item.to_month}','${item.from_applicable}','${item.due_date}','${item.extended_date}',
                     getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${item.document_url}','false','${item.remark}')`).join(', ')}`)

        res.send("Data Added")
    }
    )
}

module.exports = { Showcompliances, Insertcompliance, ShowcompliancesData, Updatecompliance, Compliancestatus, Compliancesduedate, PendingCompliances, UpdatePendingCompliances, ImportCompliances }



