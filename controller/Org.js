const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')
const uuidv1 = require("uuid/v1");

async function Insertorg(req, res) {
    const dbname = req.body.dbname;
    const org_name = req.body.org_name;
    const org_country = req.body.org_country;
    const org_state = req.body.org_state;
    const org_street = req.body.org_street;
    const org_city = req.body.org_city;
    const org_pincode = req.body.org_pincode ? req.body.org_pincode : null;
    const org_currency = req.body.org_currency;
    const org_lang = req.body.org_lang;
    const org_gst = req.body.org_gst;
    const org_contact_name = req.body.org_contact_name;
    const org_contact_phone = req.body.org_contact_phone ? req.body.org_contact_phone : null;
    const org_contact_email = req.body.org_contact_email;
    const org_pin = req.body.org_pin;
    const User_id = req.body.User_id;
    const fins_year = req.body.fins_year;
    const last_year = req.body.last_year;
    const startdate = req.body.startdate;
    const toyear = req.body.toyear;

    const uuid = uuidv1()

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into FinsDB.dbo.organisation(org_name,org_country,org_state,org_street,org_city,org_pincode,org_currency,
            org_lang,org_gst,org_contact_name,org_contact_phone,org_contact_email,add_ip_address,
            add_date_time,add_user_name,add_system_name,org_uuid,status)
            values('${org_name}','${org_country}','${org_state}','${org_street}','${org_city}','${org_pin}','${org_currency}','${org_lang}','${org_gst}','${org_contact_name}',
            ${org_contact_phone},'${org_contact_email}','${req.ip}',getdate(),'${User_id}','${os.hostname()}','${uuid}','Active')`)

        if (result.rowsAffected[0] > 0) {
            const insertfinsyear = await sql.query(`insert  into ${dbname}.dbo.tbl_fin_year (fin_year,year,from_date,to_date,mcust_count,
                cust_count,mvend_count,vend_count,invoice_ser,invoice_count,voucher_ser,voucher_count,location_count,
                add_user_name,add_date_time,add_ip_address,add_system_name,status)
                values ('${fins_year}','${last_year}','${startdate}','${toyear}','0','0','0','0','','0','','0','0','${User_id}',getdate(),
                '${req.ip}','${os.hostname()}','Active')`)

            if (insertfinsyear.rowsAffected[0] > 0) {
                res.send('Added')
            }

        }
    }
    catch (err) {
        res.send(err)
    }
}



const ShowOrganisation = async (req, res) => {
    const org_name = req.body.org_name
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FinsDB.dbo.organisation with (nolock) where org_name = '${org_name}'`)
        res.send(result.recordset[0])

    }
    catch (err) {
        res.send(err)
    }
}
const UpdateOrganisation = async (req, res) => {
    const org_name = req.body.org_name;
    const org_contact_name = req.body.org_contact_name;
    const org_contact_phone = req.body.org_contact_phone;
    const org_contact_email = req.body.org_contact_email;
    const org_street = req.body.org_street;
    const org_city = req.body.org_city;
    const org_pincode = req.body.org_pincode;
    const org_gst = req.body.org_gst;
    const User_id = req.body.User_id;
    const industry_type = req.body.industry_type;
    const fins_year = req.body.fins_year;
    const report_basic = req.body.report_basic;
    const company_id = req.body.company_id;
    const tax_id = req.body.tax_id;
    const uploadimage = req.body.uploadimage

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.organisation set org_contact_name='${org_contact_name}', org_contact_phone ='${org_contact_phone}',org_contact_email='${org_contact_email}',
                org_street='${org_street}',org_city='${org_city}',org_pincode='${org_pincode}',org_gst ='${org_gst}',update_ip_address='${req.ip}',update_date_time=getdate(),
                update_user_name='${User_id}',update_system_name ='${os.hostname()}',industry_type='${industry_type}',fins_year_month='${fins_year}',report_basic='${report_basic}',company_id='${company_id}',tax_id='${tax_id}',org_logo='${uploadimage}' where org_name ='${org_name}';
                `)
        res.send(result)

    }
    catch (err) {
        res.send(err)
    }
}

module.exports = { Insertorg, ShowOrganisation, UpdateOrganisation }