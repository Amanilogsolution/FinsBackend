const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

// Customer Add Adddress
const InsertCustomerAddress = async (req, res) => {
    const org = req.body.org;
    const userid = req.body.userid;
    const cust_id = req.body.cust_id;
    const cust_name = req.body.cust_name;
    const gst_no = req.body.gst_no;
    const billing_address_attention = req.body.billing_address_attention;
    const billing_address_country = req.body.billing_address_country;
    const billing_address_city = req.body.billing_address_city;
    const billing_address_state = req.body.billing_address_state;
    const billing_address_pincode = req.body.billing_address_pincode;
    const billing_address_phone = req.body.billing_address_phone;
    const billing_address_fax = req.body.billing_address_fax;
    console.log(org, userid, cust_id, cust_name, gst_no, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax);
   

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into ${org}.dbo.tbl_cust_addresses(cust_id ,cust_name,gst_no,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,    
      billing_address_phone ,billing_address_fax,add_date_time,add_user_name,add_system_name ,add_ip_address ,status )
      values('${cust_id}','${cust_name}','${gst_no}','${billing_address_attention}','${billing_address_country}','${billing_address_city}','${billing_address_state}','${billing_address_pincode}','${billing_address_phone}','${billing_address_fax}',getdate(),'${userid}','${os.hostname()}','${req.ip}','Active')`)
        res.send('Added');
    }
    catch (err) {
        res.send(err);
    }
}

//Vendor Add Address
const InsertVendorAddress = async (req, res) => {
    const vend_id = req.body.vend_id;
    
    const billing_address_gstno = req.body.billing_address_gstno;
    const billing_address_attention = req.body.billing_address_attention;
    const billing_address_country = req.body.billing_address_country;
    const billing_address_city = req.body.billing_address_city;
    const billing_address_state = req.body.billing_address_state;
    const billing_address_pincode = req.body.billing_address_pincode;
    const billing_address_phone = req.body.billing_address_phone;
    const billing_address_fax = req.body.billing_address_fax;
    const org= req.body.org;
    const User_id= req.body.User_id;
    console.log(vend_id, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax);

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into ${org}.dbo.tbl_vend_addresses(vend_id ,gst_no,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,    
          billing_address_phone ,billing_address_fax,add_date_time,add_user_name,add_system_name ,add_ip_address ,status,vendaddress_uuid )
          values('${vend_id}','${billing_address_gstno}','${billing_address_attention}','${billing_address_country}','${billing_address_city}','${billing_address_state}','${billing_address_pincode}','${billing_address_phone}','${billing_address_fax}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${uuidv1()}')`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}
const SelectCustAddress = async (req, res) => {
    const cust_name = req.body.cust_name;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT  cust_name FROM ${org}.dbo.tbl_cust_addresses WHERE cust_name LIKE '%${cust_name}%';`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

//
const TotalCustAddress = async (req, res) => {
    const org = req.body.org;
    const cust_id = req.body.cust_id;
    console.log(cust_id);
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * FROM ${org}.dbo.tbl_cust_addresses WHERE cust_name ='${cust_id}';`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}
// const TotalCustAddress

const TotalVendAddress = async (req, res) => {
    const vend_id = req.body.vend_id;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_vend_addresses WHERE vend_id='${vend_id}';`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const DeleteCustAddress = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_cust_addresses set status='${status}' where sno='${sno}'`)
        res.send('Deleted')
    }
    catch (err) {
        res.send(err)
    }
}

const DeleteVendAddress = async (req, res) => {
    const sno = req.body.sno;
    const status = req.body.status;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`UPDATE ${org}.dbo.tbl_vend_addresses  SET status='${status}' WHERE sno='${sno}'`)
        res.send('Deleted')
    }
    catch (err) {
        res.send(err)
    }
}

const CustAddress = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_cust_addresses where sno='${sno}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

const VendAddress = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_vend_addresses where sno='${sno}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}
const UpdateCustAddress = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    const cust_id = req.body.cust_id;
    const billing_address_attention = req.body.billing_address_attention;
    const billing_address_country = req.body.billing_address_country;
    const billing_address_city = req.body.billing_address_city;
    const billing_address_state = req.body.billing_address_state;
    const billing_address_pincode = req.body.billing_address_pincode;
    const billing_address_phone = req.body.billing_address_phone;
    const billing_address_fax = req.body.billing_address_fax;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_cust_addresses set cust_id='${cust_id}',billing_address_attention='${billing_address_attention}',billing_address_country='${billing_address_country}',billing_address_city='${billing_address_city}',billing_address_state='${billing_address_state}',billing_address_pincode='${billing_address_pincode}',billing_address_phone='${billing_address_phone}',billing_address_fax='${billing_address_fax}',update_date_time=getdate(),update_user_name='Rupesh Kumar',
            update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno='${sno}'`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateVendAddress = async (req, res) => {
    const sno = req.body.sno;
    const vend_id = req.body.vend_id;
    const billing_address_gstno = req.body.billing_address_gstno;
    const billing_address_attention = req.body.billing_address_attention;
    const billing_address_country = req.body.billing_address_country;
    const billing_address_city = req.body.billing_address_city;
    const billing_address_state = req.body.billing_address_state;
    const billing_address_pincode = req.body.billing_address_pincode;
    const billing_address_phone = req.body.billing_address_phone;
    const billing_address_fax = req.body.billing_address_fax;
    const org = req.body.org;
    const User_id = req.body.User_id;
    console.log(sno, vend_id, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax);
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_vend_addresses set vend_id='${vend_id}',gst_no='${billing_address_gstno}',billing_address_attention='${billing_address_attention}',billing_address_country='${billing_address_country}',billing_address_city='${billing_address_city}',billing_address_state='${billing_address_state}',billing_address_pincode='${billing_address_pincode}',billing_address_phone='${billing_address_phone}',billing_address_fax='${billing_address_fax}',update_date_time=getdate(),update_user_name='${User_id}',
                update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno='${sno}'`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}

const Importcustaddress = async (req,res) =>{
    const importdata= req.body.importdata;
    const org = req.body.org;
    const User_id = req.body.User_id;
    // console.log(importdata,org,User_id)
    
  

    sql.connect(sqlConfig).then(() => {

        sql.query(`select * from ${org}.dbo.tbl_cust_addresses where cust_id in ('${importdata.map(data => data.cust_id)
        .join("', '")}') OR gst_no in ('${importdata.map(data => data.gst_no)
        .join("', '")}') OR cust_name in ('${importdata.map(data => data.cust_name).join("', '")}')`)

        .then((resp) =>{
            if (resp.rowsAffected[0] > 0)
        res.send(resp.recordset.map(item => ({ "cust_id": item.cust_id, "gst_no": item.gst_no, "cust_name": item.cust_name })))
        else {

        sql.query(`INSERT INTO  ${org}.dbo.tbl_cust_addresses(cust_id ,cust_name,gst_no,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,    
            billing_address_phone ,billing_address_fax,add_date_time,add_user_name,add_system_name ,add_ip_address ,status,custaddress_uuid)

                             VALUES ${importdata.map(item => `('${item.cust_id}','${item.cust_name}','${item.gst_no}',
                             '${item.billing_address_attention}','${item.billing_address_country}',
                             '${item.billing_address_city}','${item.billing_address_state}',
                             '${item.billing_address_pincode}','${item.billing_address_phone}',
                             '${item.billing_address_fax}',getdate(),'${User_id}',
                             '${os.hostname()}','${req.ip}','Active','${uuidv1()}')`).join(', ')}`)

        res.send("Data Added")
        console.log("Data Added") 
        }
        })


    })

}


module.exports = { InsertCustomerAddress, InsertVendorAddress, TotalCustAddress, TotalVendAddress, DeleteCustAddress, DeleteVendAddress, CustAddress, VendAddress, UpdateCustAddress, UpdateVendAddress, SelectCustAddress,Importcustaddress }