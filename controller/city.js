const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");



const city = async (req, res) => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_cities order by sno desc`)
        res.send(result.recordset)
    } catch (err) {
        console.log(err)
    }
}
const insertCity = async (req, res) => {
    const city_id = req.body.city_id;
    const city_name = req.body.city_name;
    const state_name = req.body.state_name;
    const country_name = req.body.country_name;
    const uuid = uuidv1()
    console.log(city_id, city_name, state_name,country_name)
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from FINSDB.dbo.tbl_cities where city_id='${city_id}' OR city_name='${city_name}'`)
        console.log(duplicate.recordset[0])
        if(!duplicate.recordset.length){
                     const result = await sql.query(`insert into FINSDB.dbo.tbl_cities (city_id,city_name,state_name,country_name,cities_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                        values('${city_id}','${city_name}','${state_name}','${country_name}','${uuid}',getdate(),'admin','${os.hostname()}','${req.ip}','Active')`)
        res.send('Added')
        }else{
            res.send("Already")
        }
       
    }
    catch (err) {
        console.log(err)
    }
}

const deleteCity = async (req, res) => {
    const sno = req.body.sno;
    const status = req.body.status;
    console.log(sno, status)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_cities set status='${status}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        console.log(err)
    }
}

async function showcity(req,res){
    const sno = req.body.sno
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_cities where sno = ${sno}`)
        res.send(result.recordset[0])
        }
        catch(err){
            console.log(err)
            }
          }

async function updateCity(req,res){
    const sno = req.body.sno
    const city_id = req.body.city_id;
    const city_name = req.body.city_name;
    const state_name = req.body.state_name;
    const country_name = req.body.country_name;
    console.log(city_id, city_name, state_name,country_name)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_cities set city_id=${city_id},city_name='${city_name}',state_name='${state_name}',country_name='${country_name}',update_date_time=getdate(),update_user_name='admin',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',status='Active' where sno = ${sno}`)
        res.send('Updated')
    }
    catch (err) {
        console.log(err)
    }
}
const getCity = async (req, res) => {
    const state_name = req.body.state_name;
    console.log(state_name)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select city_name from FINSDB.dbo.tbl_cities where state_name = '${state_name}'`)
        res.send(result.recordset)
    }
    catch (err) {
        console.log(err)
    }
}

const ImportCity = (req, res) => {
    const datas = req.body.data;
    // let duplicatedate = [];

    sql.connect(sqlConfig).then(() => {

        sql.query(`select * from FINSDB.dbo.tbl_cities where city_id in ('${datas.map(data => data.city_id).join("', '")}') OR city_name in ('${datas.map(data => data.city_name).join(', ')}')')`)
            .then((resp) => {
                // console.log(resp.rowsAffected[0])
                if (resp.rowsAffected[0] > 0)
                    res.send(resp.recordset.map(item => ({ "city_id": item.city_id, "city_name": item.city_name})))
                else {

                    sql.query(`INSERT INTO FINSDB.dbo.tbl_cities (city_id,city_name,state_name,country_name,status,add_date_time,add_user_name,add_system_name,add_ip_address,cities_uuid) 
                    VALUES ${datas.map(item => `('${item.city_id}','${item.city_name}','${item.state_name}','${item.state_type}','${item.country_name}','Active',getdate(),'Admin','${os.hostname()}','${req.ip}','${uuidv1()}')`).join(', ')}`)
                    res.send("Data Added")
                }
            })

        // console.log(duplicatedate)

    })
}




module.exports = {city,insertCity,deleteCity,showcity,updateCity,getCity,ImportCity}