const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

// Customer Add Adddress
const InsertCustomerAddress = async (req, res) => {
    const org = req.body.org;
    const User_id = req.body.User_id;
    const custid = req.body.custid;
    const custname = req.body.custname;
    const gst_no = req.body.gst_no;
    const billing_address_attention = req.body.billing_address_attention;
    const billing_address_country = req.body.billing_address_country;
    const billing_address_city = req.body.billing_address_city;
    const billing_address_state = req.body.billing_address_state;
    const billing_address_pincode = req.body.billing_address_pincode;
    const billing_address_phone = req.body.billing_address_phone;
    const billing_address_fax = req.body.billing_address_fax;
    const custaddid = req.body.custaddid;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into ${org}.dbo.tbl_cust_addresses(cust_id ,cust_name,gst_no,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,    
      billing_address_phone ,billing_address_fax,add_date_time,add_user_name,add_system_name ,add_ip_address ,status,custaddress_uuid,cust_addressid )
      values('${custid}','${custname}','${gst_no}','${billing_address_attention}','${billing_address_country}','${billing_address_city}','${billing_address_state}','${billing_address_pincode}','${billing_address_phone}','${billing_address_fax}',
      getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${uuidv1()}','${custaddid}')`)
        res.send(result.rowsAffected);
    }
    catch (err) {
        res.send(err);
    }
}

//Vendor Add Address
const InsertVendorAddress = async (req, res) => {

    const vend_id = req.body.vendid;
    const vend_name = req.body.vend_name;
    const vendaddid = req.body.vendaddid;
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

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into ${org}.dbo.tbl_vend_addresses(vend_id,vend_name,vend_addressid,gst_no,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,    
              billing_address_phone ,billing_address_fax,add_date_time,add_user_name,add_system_name ,add_ip_address ,status,vendaddress_uuid )
              values('${vend_id}','${vend_name}','${vendaddid}','${billing_address_gstno}','${billing_address_attention}','${billing_address_country}','${billing_address_city}','${billing_address_state}','${billing_address_pincode}',
              '${billing_address_phone}','${billing_address_fax}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${uuidv1()}')`)
        res.send(result.rowsAffected)
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
        const result = await sql.query(`SELECT DISTINCT cust_id,cust_name FROM ${org}.dbo.tbl_cust_addresses with (nolock) WHERE cust_name LIKE '%${cust_name}%';`)
        res.send(result.recordset)
        
    }
    catch (err) {
        res.send(err)
    }
}

const TotalCustAddress = async (req, res) => {
    const org = req.body.org;
    const cust_id = req.body.cust_id;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * FROM ${org}.dbo.tbl_cust_addresses with (nolock) WHERE cust_id ='${cust_id}';`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

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
const SelectVendAddress = async (req, res) => {
    const vend_name = req.body.vend_name;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT DISTINCT vend_id,vend_name FROM ${org}.dbo.tbl_vend_addresses WHERE vend_name LIKE '%${vend_name}%';`)
        res.send(result.recordset)
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
    const User_id = req.body.User_id;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_cust_addresses set cust_id='${cust_id}',billing_address_attention='${billing_address_attention}',billing_address_country='${billing_address_country}',billing_address_city='${billing_address_city}',billing_address_state='${billing_address_state}',billing_address_pincode='${billing_address_pincode}',billing_address_phone='${billing_address_phone}',billing_address_fax='${billing_address_fax}',update_date_time=getdate(),update_user_name='${User_id}',
            update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno='${sno}'`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateVendAddress = async (req, res) => {
    const sno = req.body.sno;
    const vend_id = req.body.vendid;
    const vendname= req.body.vendname;
    const billing_address_gstno = req.body.billing_address_gstno;
    const billing_address_attention = req.body.billing_address_attention;
    const billing_address_country = req.body.billing_address_country;
    const billing_address_city = req.body.city;
    const billing_address_state = req.body.billing_address_state;
    const billing_address_pincode = req.body.billing_address_pincode;
    const billing_address_phone = req.body.billing_address_phone;
    const billing_address_fax = req.body.billing_address_fax;
    const org = req.body.org;
    const User_id = req.body.User_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_vend_addresses set vend_id='${vend_id}',vend_name='${vendname}',gst_no='${billing_address_gstno}',billing_address_attention='${billing_address_attention}',billing_address_country='${billing_address_country}',billing_address_city='${billing_address_city}',billing_address_state='${billing_address_state}',billing_address_pincode='${billing_address_pincode}',billing_address_phone='${billing_address_phone}',billing_address_fax='${billing_address_fax}',update_date_time=getdate(),update_user_name='${User_id}',
                update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno='${sno}'`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}

const Importcustaddress = async (req, res) => {
    const importdata = req.body.importdata;
    const org = req.body.org;
    const User_id = req.body.User_id;

    sql.connect(sqlConfig).then(() => {

        // sql.query(`select * from ${org}.dbo.tbl_cust_addresses where cust_id in ('${importdata.map(data => data.cust_id)
        //     .join("', '")}') OR gst_no in ('${importdata.map(data => data.gst_no)
        //         .join("', '")}') OR cust_name in ('${importdata.map(data => data.cust_name).join("', '")}')`)

        //     .then((resp) => {
        //         if (resp.rowsAffected[0] > 0)
        //             res.send(resp.recordset.map(item => ({ "cust_id": item.cust_id, "gst_no": item.gst_no, "cust_name": item.cust_name })))
        //         else {

        sql.query(`INSERT INTO  ${org}.dbo.tbl_cust_addresses(cust_id ,cust_name,gst_no,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,    
            billing_address_phone ,billing_address_fax,add_date_time,add_user_name,add_system_name ,add_ip_address ,status,custaddress_uuid,cust_addressid)
                             VALUES ${importdata.map(item => `('${item.cust_id}','${item.cust_name}','${item.gst_no}',
                             '${item.billing_address_attention}','${item.billing_address_country}',
                             '${item.billing_address_city}','${item.billing_address_state}',
                             '${item.billing_address_pincode}','${item.billing_address_phone}',
                             '${item.billing_address_fax}',getdate(),'${User_id}',
                             '${os.hostname()}','${req.ip}','Active','${uuidv1()}' ,'${item.cust_add_id}')`).join(', ')}`)

        res.send("Data Added")
    }
        // }
    )
    // })

}


const Importvendaddress = async (req, res) => {
    const importdata = req.body.importdata;
    const org = req.body.org;
    const User_id = req.body.User_id;

    sql.connect(sqlConfig).then(() => {
        const result = sql.query(`INSERT into ${org}.dbo.tbl_vend_addresses(vend_id,vend_name,vend_addressid,gst_no,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,    
                        billing_address_phone ,billing_address_fax,add_date_time,add_user_name,add_system_name ,add_ip_address ,status,vendaddress_uuid)
                             VALUES ${importdata.map(item => `('${item.vend_id}','${item.vend_name}','${item.vend_addressid}','${item.gst_no}','${item.billing_address_attention}','${item.billing_address_country}','${item.billing_address_city}','${item.billing_address_state}','${item.billing_address_pincode}',
                             '${item.billing_address_phone}','${item.billing_address_fax}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${uuidv1()}')`).join(', ')}`)

        res.send("Data Added")
    }
    )
}

const getVendorAddress =async (req,res) =>{
    const org = req.body.org;
    const vendor_id = req.body.vendor_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_vend_addresses where vend_id='${vendor_id}'`)
        res.send(result.recordset)

    }
    catch (err) {
        res.send(err)
    }
}


module.exports = { InsertCustomerAddress, InsertVendorAddress, TotalCustAddress, TotalVendAddress, DeleteCustAddress, DeleteVendAddress, CustAddress, VendAddress, SelectVendAddress, UpdateCustAddress, UpdateVendAddress, SelectCustAddress, Importcustaddress, Importvendaddress,getVendorAddress }