const sql =require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");



const city = async (req, res) => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_cities with (nolock) order by sno desc`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}
const insertCity = async (req, res) => {
    const city_id = req.body.city_id;
    const city_name = req.body.city_name;
    const state_name = req.body.state_name;
    const country_name = req.body.country_name;
    const User_id= req.body.User_id;
    const uuid = uuidv1()
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from FINSDB.dbo.tbl_cities where city_id='${city_id}' OR city_name='${city_name}'`)
        if(!duplicate.recordset.length){
                     const result = await sql.query(`insert into FINSDB.dbo.tbl_cities (city_id,city_name,state_name,country_name,cities_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                        values('${city_id}','${city_name}','${state_name}','${country_name}','${uuid}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active')`)
        res.send('Added')
        }else{
            res.send("Already")
        }
       
    }
    catch (err) {
        res.send(err)
    }
}

const deleteCity = async (req, res) => {
    const sno = req.body.sno;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_cities set status='${status}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}

async function showcity(req,res){
    const sno = req.body.sno
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_cities with (nolock) where sno = ${sno}`)
        res.send(result.recordset[0])
        }
        catch(err){
            res.send(err)
            }
          }

async function updateCity(req,res){
    const sno = req.body.sno
    const city_id = req.body.city_id;
    const city_name = req.body.city_name;
    const state_name = req.body.state_name;
    const country_name = req.body.country_name;
    const User_id = req.body.User_id;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_cities set city_id='${city_id}',city_name='${city_name}',state_name='${state_name}',country_name='${country_name}',
        update_date_time=getdate(),update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno = ${sno}`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}
const getCity = async (req, res) => {
    const state_name = req.body.state_name;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select city_name from FINSDB.dbo.tbl_cities with (nolock) where state_name = '${state_name}' and status='Active'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const ImportCity = (req, res) => {
    const datas = req.body.data;
    const User_id = req.body.User_id;

    sql.connect(sqlConfig).then(() => {

        sql.query(`select * from FINSDB.dbo.tbl_cities where city_id in ('${datas.map(data => data.city_id).join("', '")}') OR city_name in ('${datas.map(data => data.city_name).join("', '")}')`)
            .then((resp) => {
                if (resp.rowsAffected[0] > 0)
                    res.send(resp.recordset.map(item => ({ "city_id": item.city_id, "city_name": item.city_name})))
                else {

                    sql.query(`INSERT INTO FINSDB.dbo.tbl_cities (city_id,city_name,state_name,country_name,status,add_date_time,add_user_name,add_system_name,add_ip_address,cities_uuid) 
                    VALUES ${datas.map(item => `('${item.city_id}','${item.city_name}','${item.state_name}','${item.country_name}','Active',getdate(),'${User_id}','${os.hostname()}','${req.ip}','${uuidv1()}')`).join(', ')}`)
                    res.send("Data Added")
                }
            })


    })
}
 



module.exports = {city,insertCity,deleteCity,showcity,updateCity,getCity,ImportCity}