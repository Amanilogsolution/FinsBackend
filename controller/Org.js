const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')

async function Insertorg(req, res) {
    const org_name = req.body.org_name;
    const org_country = req.body.org_country;
    const org_state = req.body.org_state;
    const org_street = req.body.org_street;
    const org_city = req.body.org_city;
    const org_pincode = req.body.org_pincode?req.body.org_pincode:null;
    const org_currency = req.body.org_currency;
    const org_lang = req.body.org_lang ;
    const org_gst = req.body.org_gst;
    const org_contact_name = req.body.org_contact_name;
    const org_contact_phone = req.body.org_contact_phone?req.body.org_contact_phone:null;
    const org_contact_email = req.body.org_contact_email;
    const org_pin = req.body.org_pin

    console.log(org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pincode)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into FinsDB.dbo.organisation(org_name,org_country,org_state,org_street,org_city,org_pincode,org_currency,
            org_lang,org_gst,org_contact_name,org_contact_phone,org_contact_email,add_ip_address,
            add_date_time,add_user_name,add_system_name,status)
            values('${org_name}','${org_country}','${org_state}','${org_street}','${org_city}','${org_pin}','${org_currency}','${org_lang}','${org_gst}','${org_contact_name}',
            ${org_contact_phone},'${org_contact_email}','${req.ip}',getdate(),'Rupesh','${os.hostname()}','Active')`)
        res.send('done')
    }
    catch(err){
        console.log(err)
    } 
}



const ShowOrganisation = async(req,res) =>{
    const org_name = req.body.org_name
    console.log(org_name)
    try{
        await sql.connect(sqlConfig)
                const result = await sql.query(`select * from FinsDB.dbo.organisation where org_name = '${org_name}'`)
                res.send(result.recordset[0])

    }
    catch(err){
        res.send(err)
    }
}
const UpdateOrganisation = async(req,res) =>{
    const org_name = req.body.org_name;
    const org_contact_name = req.body.org_contact_name;
    const org_contact_phone = req.body.org_contact_phone;
    const org_contact_email =req.body.org_contact_email;
    const org_street = req.body.org_street;
    const org_city = req.body.org_city;
    const org_pincode = req.body.org_pincode;
    const org_gst = req.body.org_gst
    console.log(org_name,org_contact_name,org_contact_phone,org_contact_email,org_street,org_city,org_pincode,org_gst)
    try{
        await sql.connect(sqlConfig)
                const result = await sql.query(`update FINSDB.dbo.organisation set org_contact_name='${org_contact_name}', org_contact_phone ='${org_contact_phone}',org_contact_email='${org_contact_email}',
                org_street='${org_street}',org_city='${org_city}',org_pincode='${org_pincode}',org_gst ='${org_gst}',org_logo='' ,update_ip_address='${req.ip}',update_date_time=getdate(),
                update_user_name='Aman',update_system_name ='${os.hostname()}' where org_name ='${org_name}';
                `)
                res.send(result.recordset[0])

    }
    catch(err){
        res.send(err)
    }
}

module.exports = { Insertorg,ShowOrganisation,UpdateOrganisation}