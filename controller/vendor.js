const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

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

try{
    await sql.connect(sqlConfig)
    const result = await sql.query
    (`insert into tbl_new_vendor(mast_id,vend_id,vend_name,
        company_name,vend_display_name,vend_email,vend_work_phone,vend_phone,skype_detail,designation,department,
        website,gst_treatment,gstin_uin,pan_no,source_of_supply,currency,
        opening_balance,payment_terms,tds,enable_portal,portal_language,facebook_url,twitter_url,
        billing_address_attention,billing_address_country,
        billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,
        billing_address_fax,contact_person_name,
        contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark,status,add_date_time,add_user_name,add_system_name,add_ip_address)
                    values('${mast_id}','${vend_id}','${vend_name}','${company_name}','${vend_display_name}',
                    '${vend_email}','${vend_work_phone}','${vend_phone}','${skype_detail}','${designation}',
                    '${department}','${website}','${gst_treatment}','${gstin_uin}','${pan_no}',
                    '${source_of_supply}','${currency}','${opening_balance}','${payment_terms}','${tds}',
                    '${enable_portal}','${portal_language}',
                    '${facebook_url}','${twitter_url}','${billing_address_attention}','${billing_address_country}','${billing_address_city}',
                    '${billing_address_state}','${billing_address_pincode}','${billing_address_phone}','${billing_address_fax}','${contact_person_name}',
                    '${contact_person_email}','${contact_person_work_phone}','${contact_person_phone}','${contact_person_skype}','${contact_person_designation}',
                    '${contact_person_department}','${remark}','Active',getdate(),'Admin','${os.hostname()}','${req.ip}')`)
        res.send('Added')
   }
catch(err){
    console.log(err)
    }
}

const showVendor = async(req,res) => {
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_new_vendor order by sno desc`)
        res.send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

async function DeleteVendor(req,res){
    const sno = req.body.sno
    const status = req.body.status
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_new_vendor set status='${status}' where sno = ${sno}`)
        res.send('done')
        }
        catch(err){
            console.log(err)
            }
         }

async function Vendor(req,res){
    const sno = req.body.sno
    console.log(sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`Select * from tbl_new_vendor where sno = ${sno}`)
        res.send(result.recordset[0])
    }catch(err){
        console.log(err)
    }
}


async function UpdateVendor(req,res){
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
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`
          update tbl_new_vendor set vend_email='${vend_email}',vend_work_phone='${vend_work_phone}',vend_phone='${vend_phone}',
          contact_person_name='${contact_person_name}',contact_person_email='${contact_person_email}',contact_person_work_phone='${contact_person_work_phone}',
          contact_person_phone='${contact_person_phone}',contact_person_skype='${contact_person_skype}',contact_person_designation='${contact_person_designation}',
          contact_person_department='${contact_person_department}',remark='${remark}',update_date_time=getdate(),update_user_name='Aman',
          update_system_name='${os.hostname()}',update_ip_address='${req.ip}'
           where sno=${sno};`)
        res.send('done')
        }
        catch(err){
            console.log(err)
            }
         }


module.exports = {InsertVendor,showVendor,DeleteVendor,Vendor,UpdateVendor}

