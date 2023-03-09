const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

const TotalChargeCode = async (req, res) => {
    const org = req.body.org

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_charge_code with (nolock) order by sno desc`)

        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}

const deleteChargeCode = async (req, res) => {
    const org = req.body.org
    const sno = req.body.sno;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_charge_code set status='${status}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}

const AddChargeCode = async (req, res) => {
    const org = req.body.org
    const description = req.body.description;
    const short_name = req.body.short_name;
    const nature = req.body.nature;
    const major_code = req.body.major_code;
    const chartofaccount = req.body.chartofaccount;
    const activity = req.body.activity;
    const sacHsn = req.body.sacHsn;
    const gst_rate = req.body.gst_rate
    const User_id = req.body.User_id;
    const major_code_val = req.body.major_code_val;

    try {
        await sql.connect(sqlConfig)

        const result = await sql.query(`insert into ${org}.dbo.tbl_charge_code(description,short_name,nature,major_code,activity,sacHsn,
                gst_rate,add_date_time,add_user_name,add_system_name,add_ip_address,status,chartof_account,major_code_id)
                values('${description}','${short_name}','${nature}','${major_code}','${activity}','${sacHsn}','${gst_rate}',getDate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${chartofaccount}','${major_code_val}')
                `)
        res.send('Added')

    }
    catch (err) {
        res.send(err)
    }
}

async function getChargeCode(req, res) {
    const org = req.body.org
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_charge_code with (nolock) where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateChargeCode = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org
    const description = req.body.description;
    const short_name = req.body.short_name;
    const nature = req.body.nature;
    const major_code = req.body.major_code;
    const chartofaccount = req.body.chartofaccount;
    const activity = req.body.activity;
    const sacHsn = req.body.sacHsn;
    const gst_rate = req.body.gst_rate
    const User_id = req.body.User_id;
    const major_code_val = req.body.major_code_val;

    try {
        await sql.connect(sqlConfig)

        const result = await sql.query(` update ${org}.dbo.tbl_charge_code set description='${description}',short_name='${short_name}',nature='${nature}',major_code='${major_code}',
             major_code_id='${major_code_val}', chartof_account='${chartofaccount}' ,activity='${activity}',sacHsn ='${sacHsn}',gst_rate ='${gst_rate}', update_date_time=getDate(),
            update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address ='${req.ip}' where sno='${sno}'`)
        res.send("updated")
    }
    catch (err) {
        res.send(err)
    }
}

const ActiveChargeCodeMajor = async (req, res) => {
    const org = req.body.org;
    const major_code_id = req.body.major_code_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_charge_code with (nolock) where status='Active' and major_code_id='${major_code_id}'`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}


module.exports = { TotalChargeCode, deleteChargeCode, AddChargeCode, getChargeCode, UpdateChargeCode, ActiveChargeCodeMajor }