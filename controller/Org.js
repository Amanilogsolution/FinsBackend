const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')

async function Insertorg(req, res) {
    const org_name = req.body.org_name;
    console.log(org_name)
    // const org_country = req.body.org_country;
    // const org_state = req.body.org_state;
    // const org_contactname =req.body.org_contactname;
    // const org_contact_mobile = req.body.org_contact_mobile;
    // const org_contact_email = req.body.org_contact_email;
    // const org_street1 = req.body.org_street1;
    // const org_street2 = req.body.org_street2;
    // const org_city = req.body.org_city;
    // const org_pin = req.body.org_pin;
    // const org_currency = req.body.org_currency;
    // const org_lang = req.body.org_lang;
    // const system_name = os.hostname()
    try {
        await sql.connect(sqlConfig)
        // const result = await sql.query(`insert into Organisation (org_name,org_country,org_state,state_type,country_name,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        //                 values('${org_name}','${org_country}','${org_state}','${select_type}','${country_name}',getdate(),'admin','${system_name}','${req.ip}','Active')`)
        const result = await sql.query(`create schema ${org_name}`)
        if(result){
            const table = await sql.query(`
            create table ${org_name}.test (sno bigint NULL)
            create table ${org_name}.test1 (sno bigint NULL)
            create table ${org_name}.test2 (sno bigint NULL)
            `)
        }
        res.send(result.record[0])
    }
    catch (err) {
        res.send(err)
    }
}

const InsertTotalTable = async(req,res) =>{
    const datas = req.body.data;
    console.log(datas)
    try{
        // datas.forEach(async(item) => {
        // await sql.connect(sqlConfig)
        // const  result = await sql.query(`insert into dbo.import_test (sno,name,roll) values(${item.sno},'${item.name}','${item.roll}')`)
    
        // }
        // )
    }
    catch (err){
        console.log(err)
    }
}

module.exports = { Insertorg,InsertTotalTable}