const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')

async function TotalStates(req, res) {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_states order by sno desc`)
        res.send(result.recordset)
    }
    catch (err) {
        console.log(err)
    }
}

async function deleteState(req, res) {
    const sno = req.body.sno;
    const status = req.body.status;
    console.log(sno, status)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_states set status='${status}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        console.log(err)
    }
}



async function state(req, res) {
    const state_name = req.body.state_name;
    const country_name = req.body.country_name;
    const state_code = req.body.state_code;
    const state_short_name = req.body.state_short_name;
    const select_type = req.body.select_type;
    const system_name = os.hostname()
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into tbl_states (state_name,state_code,state_short_name,state_type,country_name,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                        values('${state_name}','${state_code}','${state_short_name}','${select_type}','${country_name}',getdate(),'admin','${system_name}','${req.ip}','Active')`)
        res.send('Added')
    }
    catch (err) {
        console.log(err)
    }
}

async function showstate(req, res) {
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_states where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        console.log(err)
    }
}

async function EditState(req, res) {
    const sno = req.body.sno;
    const state_name = req.body.state_name;
    const country_name = req.body.country_name;
    const state_code = req.body.state_code;
    const state_short_name = req.body.state_short_name;
    const select_type = req.body.select_type;
    console.log(sno, state_name, country_name, state_code, state_short_name, select_type)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_states set state_name = '${state_name}',state_code = '${state_code}',state_short_name = '${state_short_name}',state_type = '${select_type}',country_name = '${country_name}'
                                                                      ,update_date_time=getdate(),update_user_name='Admin',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno = '${sno}'`)
        res.send('Updated')
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { TotalStates, deleteState, state, showstate, EditState }
