const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')
const uuidv1 = require("uuid/v1");


async function TotalUnit(req, res) {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_unit with (nolock) order by sno desc`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}
async function TotalActiveUnit(req, res) {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_unit with (nolock) where status='Active' order by sno asc`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

async function deleteUnit(req, res) {
    const sno = req.body.sno;
    const status = req.body.status;
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_unit set status='${status}' where sno = ${sno}`)
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
}



async function Unit(req, res) {
    const unit_name = req.body.unit_name;
    const unit_symbol = req.body.unit_symbol;
    const org = req.body.org
    const uuid = uuidv1()
   
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from ${org}.dbo.tbl_unit where unit_name='${unit_name}' OR unit_symbol='${unit_symbol}'`)

        if (!duplicate.recordset.length) {
            const result = await sql.query(`insert into ${org}.dbo.tbl_unit (unit_name,unit_symbol,unit_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                        values('${unit_name}','${unit_symbol}','${uuid}',getdate(),'admin','${os.hostname()}','${req.ip}','Active')`)
            res.send('Added')
        } else {
            res.send("Already")
        }
    }

    catch (err) {
        res.send(err)
    }
}

async function showunit(req, res) {
    const sno = req.body.sno
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_unit with (nolock) where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}
    
async function UpdateUnit(req, res) {
    const sno = req.body.sno;
    const unit_name = req.body.unit_name;
    const unit_symbol = req.body.unit_symbol;
    const org = req.body.org

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_unit set unit_name = '${unit_name}',unit_symbol = '${unit_symbol}',update_date_time=getdate(),update_user_name='Admin',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno = '${sno}'`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}

const ImportUnit = (req, res) => {
    const datas = req.body.data;
    const org = req.body.org;

    sql.connect(sqlConfig).then(() => {

        sql.query(`select * from ${org}.dbo.tbl_unit where unit_name in ('${datas.map(data => data.unit_name).join("', '")}') OR unit_symbol in ('${datas.map(data => data.unit_symbol).join("', '")}')`)
            .then((resp) => {
                if (resp.rowsAffected[0] > 0)
                    res.send(resp.recordset.map(item => ({ "unit_name": item.unit_name, "unit_symbol": item.unit_symbol})))
                else {

                    sql.query(`INSERT INTO ${org}.dbo.tbl_unit (unit_name,unit_symbol,status,add_date_time,add_user_name,add_system_name,add_ip_address,unit_uuid) 
                    VALUES ${datas.map(item => `('${item.unit_name}','${item.unit_symbol}','Active',getdate(),'Admin','${os.hostname()}','${req.ip}','${uuidv1()}')`).join(', ')}`)
                    res.send("Data Added")
                }
            })

    })
}

module.exports = { TotalUnit,TotalActiveUnit, deleteUnit, Unit, showunit, UpdateUnit,ImportUnit }
