const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");



const city = async (req, res) => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_cities order by sno desc`)
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
        const duplicate = await sql.query(`select * from tbl_cities where city_id='${city_id}' OR city_name='${city_name}'`)
        console.log(duplicate.recordset[0])
        if(!duplicate.recordset.length){
                     const result = await sql.query(`insert into tbl_cities (city_id,city_name,state_name,country_name,cities_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
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
        const result = await sql.query(`update tbl_cities set status='${status}' where sno = ${sno}`)
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
        const result = await sql.query(`select * from tbl_cities where sno = ${sno}`)
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
        const result = await sql.query(`update tbl_cities set city_id=${city_id},city_name='${city_name}',state_name='${state_name}',country_name='${country_name}',update_date_time=getdate(),update_user_name='admin',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',status='Active' where sno = ${sno}`)
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
        const result = await sql.query(`select city_name from tbl_cities where state_name = '${state_name}'`)
        res.send(result.recordset)
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = {city,insertCity,deleteCity,showcity,updateCity,getCity}