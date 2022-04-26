const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')
const uuidv1 = require("uuid/v1");


async function TotalUnit(req, res) {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_unit order by sno desc`)
        res.send(result.recordset)
        // console.log(res.send(result.recordset))
    }
    catch (err) {
        res.send(err)
    }
}

async function deleteUnit(req, res) {
    const sno = req.body.sno;
    const status = req.body.status;
    // console.log(sno,status)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_unit set status='${status}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}



async function Unit(req, res) {
    const unit_name = req.body.unit_name;
    const unit_symbol = req.body.unit_symbol;
    const uuid = uuidv1()
    // console.log(unit_name,unit_symbol)
    // const system_name = os.hostname()
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from tbl_unit where unit_name='${unit_name}' OR unit_symbol='${unit_symbol}'`)
        // console.log(duplicate)

        if (!duplicate.recordset.length) {
            const result = await sql.query(`insert into tbl_unit (unit_name,unit_symbol,unit_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
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
    // console.log(sno)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_unit where sno = ${sno}`)
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

    // console.log(sno,unit_name,unit_symbol)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_unit set unit_name = '${unit_name}',unit_symbol = '${unit_symbol}'
                                                                      ,update_date_time=getdate(),update_user_name='Admin',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno = '${sno}'`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}


module.exports = { TotalUnit, deleteUnit, Unit, showunit, UpdateUnit }
