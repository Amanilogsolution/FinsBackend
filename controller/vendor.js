const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const InsertVendor = async (req, res) => {
    const mast_id = req.body.mast_id;
    const vend_id = req.body.vend_id;
    const vend_name = req.body.vend_name;
    const company_name = req.body.company_name;
    const vend_display_name = req.body.vend_display_name;
    const vend_email = req.body.vend_email;
    const vend_work_phone = req.body.vend_work_phone;
    const vend_phone = req.body.vend_phone;
    const skype_detail = req.body.skype_detail;
    const designation = req.body.designation;
    const department = req.body.department;
    const website = req.body.website;
    const gst_treatment = req.body.gst_treatment;
    const gstin_uin = req.body.gstin_uin;
    const pan_no = req.body.pan_no;
    const source_of_supply = req.body.source_of_supply;
    const currency = req.body.currency;
    const opening_balance = req.body.opening_balance;
    const payment_terms = req.body.payment_terms;
    const tds = req.body.tds;
    const enable_portal = req.body.enable_portal;
    const portal_language = req.body.portal_language;
    const facebook_url = req.body.facebook_url;
    const twitter_url = req.body.twitter_url;
    const billing_address_attention = req.body.billing_address_attention;
    const billing_address_country = req.body.billing_address_country;
    const billing_address_city = req.body.billing_address_city;
    const billing_address_state = req.body.billing_address_state;
    const billing_address_pincode = req.body.billing_address_pincode;
    const billing_address_phone = req.body.billing_address_phone;
    const billing_address_fax = req.body.billing_address_fax;
    const contact_person_name = req.body.contact_person_name;
    const contact_person_email = req.body.contact_person_email;
    const contact_person_work_phone = req.body.contact_person_work_phone;
    const contact_person_phone = req.body.contact_person_phone;
    const contact_person_skype = req.body.contact_person_skype;
    const contact_person_designation = req.body.contact_person_designation;
    const contact_person_department = req.body.contact_person_department;
    const remark = req.body.remark;
    const uuid = uuidv1()

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query
            (`insert into FINSDB.dbo.tbl_new_vendor(mast_id,vend_id,vend_name,
        company_name,vend_display_name,vend_email,vend_work_phone,vend_phone,skype_detail,designation,department,
        website,gst_treatment,gstin_uin,pan_no,source_of_supply,currency,
        opening_balance,payment_terms,tds,enable_portal,portal_language,facebook_url,twitter_url,
        billing_address_attention,billing_address_country,
        billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,
        billing_address_fax,contact_person_name,
        contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark,newvend_uuid,status,add_date_time,add_user_name,add_system_name,add_ip_address)
                    values('${mast_id}','${vend_id}','${vend_name}','${company_name}','${vend_display_name}',
                    '${vend_email}','${vend_work_phone}','${vend_phone}','${skype_detail}','${designation}',
                    '${department}','${website}','${gst_treatment}','${gstin_uin}','${pan_no}',
                    '${source_of_supply}','${currency}','${opening_balance}','${payment_terms}','${tds}',
                    '${enable_portal}','${portal_language}',
                    '${facebook_url}','${twitter_url}','${billing_address_attention}','${billing_address_country}','${billing_address_city}',
                    '${billing_address_state}','${billing_address_pincode}','${billing_address_phone}','${billing_address_fax}','${contact_person_name}',
                    '${contact_person_email}','${contact_person_work_phone}','${contact_person_phone}','${contact_person_skype}','${contact_person_designation}',
                    '${contact_person_department}','${remark}','${uuid}','Active',getdate(),'Admin','${os.hostname()}','${req.ip}')`)
        res.send('Added')
    }
    catch (err) {
        console.log(err)
    }
}

const showVendor = async (req, res) => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_new_vendor order by sno desc`)
        res.send(result.recordset)
    }
    catch (err) {
        console.log(err)
    }
}

async function DeleteVendor(req, res) {
    const sno = req.body.sno
    const status = req.body.status
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_new_vendor set status='${status}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        console.log(err)
    }
}

async function Vendor(req, res) {
    const sno = req.body.sno
    console.log(sno)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`Select * from FINSDB.dbo.tbl_new_vendor where sno = ${sno}`)
        res.send(result.recordset[0])
    } catch (err) {
        console.log(err)
    }
}


async function UpdateVendor(req, res) {
    const sno = req.body.sno
    const vend_email = req.body.vend_email
    const vend_work_phone = req.body.vend_work_phone
    const vend_phone = req.body.vend_phone
    const contact_person_name = req.body.contact_person_name
    const contact_person_email = req.body.contact_person_email
    const contact_person_work_phone = req.body.contact_person_work_phone
    const contact_person_phone = req.body.contact_person_phone
    const contact_person_skype = req.body.contact_person_skype
    const contact_person_designation = req.body.contact_person_designation
    const contact_person_department = req.body.contact_person_department
    const remark = req.body.remark
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`
          update FINSDB.dbo.tbl_new_vendor set vend_email='${vend_email}',vend_work_phone='${vend_work_phone}',vend_phone='${vend_phone}',
          contact_person_name='${contact_person_name}',contact_person_email='${contact_person_email}',contact_person_work_phone='${contact_person_work_phone}',
          contact_person_phone='${contact_person_phone}',contact_person_skype='${contact_person_skype}',contact_person_designation='${contact_person_designation}',
          contact_person_department='${contact_person_department}',remark='${remark}',update_date_time=getdate(),update_user_name='Aman',
          update_system_name='${os.hostname()}',update_ip_address='${req.ip}'
           where sno=${sno};`)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}

const Vendor_id = async (req, res) => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT vend_id from FINSDB.dbo.tbl_new_vendor`)
        res.send(result.recordset)
    }
    catch (err) {
        console.log(err)
    }
}


const ImportVendor = (req, res) => {
    const org = req.body.org;
    const datas = req.body.data;
    const User_id = req.body.User_id;
    console.log(datas)
    

    sql.connect(sqlConfig).then(() => {

        sql.query(`select * from ${org}.dbo.tbl_new_vendor where vend_email in ('${datas.map(data => data.vend_email).join("', '")}') OR vend_phone in ('${datas.map(data => data.vend_phone).join(', ')}') OR gstin_uin in ('${datas.map(data => data.gstin_uin).join("', '")}') OR pan_no in ('${datas.map(data => data.pan_no).join("','")}')`)
            .then((resp) => {
                if (resp.rowsAffected[0] > 0)
                    res.send(resp.recordset.map(item => ({ "vend_email": item.vend_email, "vend_phone": item.vend_phone, "gstin_uin": item.gstin_uin, "pan_no": item.pan_no })))
                else {
                    sql.query(`insert into ${org}.dbo.tbl_new_vendor(mast_id,vend_id,vend_name,
                        company_name,vend_display_name,vend_email,vend_work_phone,vend_phone,skype_detail,designation,department,
                        website,gst_treatment,gstin_uin,pan_no,source_of_supply,currency,
                        opening_balance,payment_terms,tds,enable_portal,portal_language,facebook_url,twitter_url,
                        billing_address_attention,billing_address_country,
                        billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,
                        billing_address_fax,contact_person_name,
                        contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
                        contact_person_department,remark,newvend_uuid,status,add_date_time,add_user_name,add_system_name,add_ip_address)

                        values ${datas.map(item => `('${item.mast_id+1}','${item.vend_id}','${item.vend_name}','${item.company_name}','${item.vend_display_name}',
                                    '${item.vend_email}',${item.vend_work_phone},${item.vend_phone},'${item.skype_detail}','${item.designation}',
                                    '${item.department}','${item.website}','${item.gst_treatment}','${item.gstin_uin}','${item.pan_no}',
                                    '${item.source_of_supply}','${item.currency}','${item.opening_balance}','${item.payment_terms}','${item.tds}',
                                    'true','English',
                                    '${item.facebook_url}','${item.twitter_url}','${item.billing_address_attention}','${item.billing_address_country}','${item.billing_address_city}',
                                    '${item.billing_address_state}',${item.billing_address_pincode},'${item.billing_address_phone}','${item.billing_address_fax}','${item.contact_person_name}',
                                    '${item.contact_person_email}',${item.contact_person_work_phone},${item.contact_person_phone},'${item.contact_person_skype}','${item.contact_person_designation}',
                                    '${item.contact_person_department}','${item.remark}','${uuidv1()}','Active',getdate(),'${User_id}','${os.hostname()}','${req.ip}')`).join(',')}`)
                    res.send("Data Added")
                }
            })


    })
}

module.exports = { InsertVendor, showVendor, DeleteVendor, Vendor, UpdateVendor, Vendor_id, ImportVendor }

