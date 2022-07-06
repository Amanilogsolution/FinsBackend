const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const countries = async (req, res) => {
 
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_countries with (nolock) order by sno desc`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}
const Activecountries = async (req, res) => {
 
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select country_name from FINSDB.dbo.tbl_countries with (nolock) where status='Active' `)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}

const InsertCountry = async (req, res) => {
    const User_id = req.body.User_id;
    const country_name = req.body.country_name;
    const country_id = req.body.country_id;
    const country_code = req.body.country_code;
    const country_phonecode = req.body.country_phonecode;
    const uuid = uuidv1()
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from FINSDB.dbo.tbl_countries where country_name='${country_name}' OR country_id='${country_id}' OR country_code='${country_code}' OR country_phonecode='${country_phonecode}'`)
        if (!duplicate.recordset.length) {
            const result = await sql.query(`insert into FINSDB.dbo.tbl_countries (country_name,country_id,country_code,country_phonecode,country_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        values('${country_name}','${country_id}','${country_code}','${country_phonecode}','${uuid}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active')`)
            res.send('Added')
        } else {
            res.send("Already")
        }
    }
    catch (err) {
        res.send(err)
    }
}
async function showcountry(req, res) {
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_countries with (nolock) where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

async function updatecountry(req, res) {
    const User_id = req.body.User_id
    const sno = req.body.sno
    const country_name = req.body.country_name;
    const country_id = req.body.country_id;
    const country_code = req.body.country_code;
    const country_phonecode = req.body.country_phonecode;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_countries set country_name='${country_name}',country_id='${country_id}',country_code='${country_code}',country_phonecode='${country_phonecode}',update_date_time=getdate(),update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}

async function deletecountry(req, res) {
    const sno = req.body.sno
    const status = req.body.status
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_countries set status='${status}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}


const CheckimportCountry = (req, res) => {
    const datas = req.body.data;
    const User_id = req.body.User_id;
    // console.log(datas)

    sql.connect(sqlConfig).then(() => {

        sql.query(`select * from FINSDB.dbo.tbl_countries where country_name in ('${datas.map(data => data.country_name).join("', '")}') OR country_id in ('${datas.map(data => data.country_id).join("', '")}') OR country_code in ('${datas.map(data => data.country_code).join("', '")}') OR country_phonecode in ('${datas.map(data => data.country_phonecode).join("', '")}')`)
            .then((resp) => {
                if (resp.rowsAffected[0] > 0)
                    res.send(resp.recordset.map(item => ({ "country_name": item.country_name, "country_id": item.country_id, "country_code": item.country_code, "country_phonecode": item.country_phonecode })))
                else {

                  sql.query(`INSERT INTO FINSDB.dbo.tbl_countries (country_name,country_id,country_code,country_phonecode,status,add_date_time,add_user_name,add_system_name,add_ip_address,country_uuid) 
                    VALUES ${datas.map(item => `('${item.country_name}','${item.country_id}','${item.country_code}','${item.country_phonecode}','Active',getdate(),'${User_id}','${os.hostname()}','${req.ip}','${uuidv1()}')`).join(', ')}`)
                    
                    res.send("Data Added")
                }
            })


    })
}




module.exports = { countries,Activecountries, InsertCountry, showcountry, updatecountry, deletecountry, CheckimportCountry }
