const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const GlCode = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT account_sub_name_code,account_sub_name from ${org}.dbo.tbl_sub_account with (nolock) where status='Active' `)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const GlSubCode = async (req, res) => {
    const org = req.body.org;
    const glCode = req.body.glCode;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT COUNT(charge_code) as count FROM ${org}.dbo.tbl_gl_sub WHERE gl_code ='${glCode}' `)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}
const InsertGlSubCode = async (req, res) => {
    const org = req.body.org;
    const glCode = req.body.glCode;
    const SubCode = req.body.SubCode;
    const charge_code = req.body.charge_code;
    const company_id = req.body.company_id;
    const User_id = req.body.User_id;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into ${org}.dbo.tbl_gl_sub(charge_code,sub_code,gl_code,company_id,add_user_name,add_system_name,
            add_ip_address,add_date_time,status)
            values('${charge_code}','${SubCode}','${glCode}','${company_id}','${User_id}','${os.hostname()}','${req.ip}',getDate(),'Active')`)
        res.send(result);
    }
    catch (err) {
        res.send(err)
    }
}

const ShowTotalSubCode = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_gl_sub;`)
        res.send(result.recordset)

    }
    catch (err) {
        res.send(err)
    }
}
const SubCodeStatus = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`UPDATE ${org}.dbo.tbl_gl_sub SET status='${status}' WHERE sno='${sno}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const GetSubCodeDetails = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_gl_sub where sno='${sno}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateSubCodeDetails = async (req, res) => {
    const org = req.body.org;
    const charge_code = req.body.charge_code;
    const sub_code = req.body.sub_code;
    const gl_code = req.body.gl_code;
    const sno = req.body.sno;
    const company_id = req.body.company_id;
    const User_id = req.body.User_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_gl_sub set charge_code='${charge_code}',sub_code='${sub_code}',gl_code='${gl_code}',company_id='${company_id}',
        update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=GETDATE() WHERE sno=${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

const ImportSubcode = (req, res) => {
    const org = req.body.org;
    const datas = req.body.data;
    const User_id = req.body.User_id;

    sql.connect(sqlConfig).then(() => {

        sql.query(`INSERT into ${org}.dbo.tbl_gl_sub(charge_code,sub_code,gl_code,company_id,add_user_name,add_system_name,
                        add_ip_address,add_date_time,status) 
                    VALUES ${datas.map(item => `('${item.charge_Code}','${item.sub_code}','${item.gl_code}','${item.CompanyID}',
                    '${User_id}','${os.hostname()}','${req.ip}',getDate(),'Active')`).join(', ')}`)
        res.send("Data Added")
    }
    )

}


module.exports = { GlCode, GlSubCode, InsertGlSubCode, ShowTotalSubCode, SubCodeStatus, GetSubCodeDetails, UpdateSubCodeDetails, ImportSubcode }
