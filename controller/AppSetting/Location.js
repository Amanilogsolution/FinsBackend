const sql = require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const TotalLocation = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_location_master with (nolock) order by sno desc`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}

const AddLocation = async (req, res) => {
    const org = req.body.org
    const Location_id = req.body.Location_id;
    const location_name = req.body.location_name;
    const gstin_no = req.body.gstin_no;
    const contact_name1 = req.body.contact_name1;
    const contact_name2 = req.body.contact_name2;
    const contact_phone_no1 = req.body.contact_phone_no1;
    const contact_phone_no2 = req.body.contact_phone_no2;
    const User_id = req.body.User_id;
    const fins_year = req.body.fins_year;
    const country = req.body.country;
    const state = req.body.state;

    try {

        const result = await sql.query(`insert into ${org}.dbo.tbl_location_master (location_name,gstin_no,location_id,contact_name1,
                contact_name2,contact_phone_no1,contact_phone_no2,
                add_date_time,add_user_name,add_system_name,add_ip_address,status,fins_year,country,state)
                values('${location_name}','${gstin_no}','${Location_id}','${contact_name1}','${contact_name2}','${contact_phone_no1}','${contact_phone_no2}',
                getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${fins_year}','${country}','${state}')`)
        res.send('Added')

    }
    catch (err) {
        res.send(err)
    }
}

const ShowLocation = async (req, res) => {
    const org = req.body.org
    const location_id = req.body.location_id

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_location_master with (nolock) where location_id='${location_id}' and status='Active'`)
        res.send(result.recordset[0])
    } catch (err) {
        res.send(err)
    }
}

const LocationAddress = async (req, res) => {
    const org = req.body.org
    const location_id = req.body.location_id
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT location_name,gstin_no,location_add1,location_add2,location_city,location_pin,convert(varchar(15),from_date,121) as from_date ,location_state,location_country from ${org}.dbo.tbl_location_address with (nolock) where location_id='${location_id}' and status='Active'`)
        res.send(result.recordset[0])
    } catch (err) {
        res.send(err)
    }
}

const UpdateLocation = async (req, res) => {
    const org = req.body.org
    const location_name = req.body.location_name;
    const gstin_no = req.body.gstin_no;
    const contact_name1 = req.body.contact_name1;
    const contact_name2 = req.body.contact_name2;
    const contact_phone_no1 = req.body.contact_phone_no1;
    const contact_phone_no2 = req.body.contact_phone_no2;
    const location_id = req.body.location_id;
    const User_id = req.body.User_id;
    const country = req.body.country;
    const state = req.body.state

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_location_master set location_name='${location_name}',
        gstin_no='${gstin_no}',contact_name1 ='${contact_name1}',contact_name2 ='${contact_name2}',contact_phone_no1='${contact_phone_no1}',contact_phone_no2 ='${contact_phone_no2}',
        update_date_time=GETDATE(),update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',country='${country}',state='${state}' WHERE location_id ='${location_id}';`)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}

const InsertLocationAddress = async (req, res) => {
    const org = req.body.org;
    const location_name = req.body.location_name;
    const gstin_no = req.body.gstin_no
    const location_add1 = req.body.location_add1
    const location_add2 = req.body.location_add2;
    const location_city = req.body.location_city;
    const location_state = req.body.location_state;
    const location_country = req.body.location_country;
    const from_date = req.body.from_date;
    const location_id = req.body.location_id;
    const location_pin = req.body.location_pin;
    const to_date = req.body.to_date;
    const User_id = req.body.User_id;

    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from ${org}.dbo.tbl_location_address where location_id='${location_id}' and status = 'Active'`)
        if (duplicate.rowsAffected > 0) {
            const update = await sql.query(`update ${org}.dbo.tbl_location_address set status='Deactive',to_date='${to_date}' where status='Active' and location_id='${location_id}'`)
            const insert = await sql.query(`insert into  ${org}.dbo.tbl_location_address (location_id,location_name,gstin_no,location_add1,location_add2,location_city,location_state,location_pin,location_country,from_date,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                                         values('${location_id}','${location_name}','${gstin_no}','${location_add1}','${location_add2}','${location_city}','${location_state}','${location_pin}','${location_country}','${from_date}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active')`)
            res.send(insert)
        }
        else {
            const insert = await sql.query(`insert into  ${org}.dbo.tbl_location_address (location_id,location_name,gstin_no,location_add1,location_add2,location_city,location_state,location_pin,location_country,from_date,add_date_time,add_user_name,add_system_name,add_ip_address,status)
            values('${location_id}','${location_name}','${gstin_no}','${location_add1}','${location_add2}','${location_city}','${location_state}','${location_pin}','${location_country}','${from_date}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active')`)
            res.send(insert)
        }
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateLocationAddress = async (req, res) => {
    const org = req.body.org
    const location_add1 = req.body.location_add1
    const location_add2 = req.body.location_add2;
    const location_city = req.body.location_city;
    const location_state = req.body.location_state;
    const location_country = req.body.location_country;
    const from_date = req.body.from_date
    const location_id = req.body.location_id
    const location_pin = req.body.location_pin;
    const User_id = req.body.User_id;

    try {
        await sql.query(`update ${org}.dbo.tbl_location_address  set location_add1='${location_add1}',location_add2='${location_add2}',
        location_city='${location_city}',location_state='${location_state}',location_country='${location_country}', from_date='${from_date}',location_pin='${location_pin}',
        update_date_time=getDate(),update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' 
         WHERE location_id='${location_id}';`)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}


const Locationstatus = async (req, res) => {
    const org = req.body.org;
    const location_id = req.body.location_id;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_location_master set status='${status}' where location_id='${location_id}'`)
        res.status(200).send("Successfully Updated")
    }
    catch (err) {
        res.send(err)
    }
}

// const LastLocationid = async (req, res) => {
//     const org = req.body.org;
//     try {
//         await sql.connect(sqlConfig)
//         const result = await sql.query(`SELECT COUNT(location_id) as count FROM ${org}.dbo.tbl_location_master;`)
//         res.status(200).send(result.recordset[0])
//     }
//     catch (err) {
//         res.send(err)
//     }
// }


const ActiveLocation = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * FROM ${org}.dbo.tbl_location_master with (nolock) where status='Active';`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}


const ImportLocationMaster = (req, res) => {
    const org = req.body.org;
    const datas = req.body.datas;
    const User_id = req.body.User_id;

    sql.connect(sqlConfig).then(() => {
        sql.query(`INSERT INTO ${org}.dbo.tbl_location_master (location_name,gstin_no,location_id,contact_name1,
            contact_name2,contact_phone_no1,contact_phone_no2,
            add_date_time,add_user_name,add_system_name,add_ip_address,status,country,state) 
                    VALUES ${datas.map(item => `('${item.location_name}','${item.gstin_no}','${item.location_id}','${item.contact_name1}','${item.contact_name2}',
                    '${item.contact_phone_no1}','${item.contact_phone_no2}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${item.country}','${item.state}')`).join(', ')}`)
        res.send("Data Added")

    })
}

const ImportLocationAddress = (req, res) => {
    const org = req.body.org;
    const datas = req.body.datas;
    const User_id = req.body.User_id;

    sql.connect(sqlConfig).then(() => {

        sql.query(`insert into  ${org}.dbo.tbl_location_address (location_id,location_name,gstin_no,
            location_add1,location_add2,location_city,location_state,location_pin,location_country,
            from_date,add_date_time,add_user_name,add_system_name,add_ip_address,status) 
                    VALUES ${datas.map(item => `('${item.location_id}','${item.location_name}','${item.gstin_no}','${item.location_add1}','${item.location_add2}',
                    '${item.location_city}','${item.location_state}','${item.location_pin}','${item.location_country}','${item.from_date}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active')`).join(', ')}`)
        res.send("Data Added")

    })
}

const ActiveLocationAddress = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * FROM ${org}.dbo.tbl_location_address with (nolock) where status='Active'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {
    AddLocation, TotalLocation, LocationAddress, UpdateLocationAddress, ShowLocation, InsertLocationAddress, UpdateLocation, Locationstatus,
    // LastLocationid,
    ActiveLocation, ImportLocationMaster, ImportLocationAddress, ActiveLocationAddress
}
