const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

const InsertCustomerAddress = async (req, res) => {
const cust_id = req.body.cust_id;
const billing_address_attention = req.body.billing_address_attention;
const billing_address_country = req.body.billing_address_country;
const billing_address_city = req.body.billing_address_city;
const billing_address_state = req.body.billing_address_state;
const billing_address_pincode = req.body.billing_address_pincode;
const billing_address_phone   = req.body.billing_address_phone;
const billing_address_fax = req.body.billing_address_fax;
console.log(cust_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax);

try {
    await sql.connect(sqlConfig)
    const result = await sql.query(`INSERT into tbl_cust_addresses(cust_id ,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,    
      billing_address_phone ,billing_address_fax,add_date_time,add_user_name,add_system_name ,add_ip_address ,status )
      values('${cust_id}','${billing_address_attention}','${billing_address_country}','${billing_address_city}','${billing_address_state}','${billing_address_pincode}','${billing_address_phone}','${billing_address_fax}',getdate(),'Rupesh','${os.hostname()}','${req.ip}','Active')`)
    res.send('Added')
}
catch(err){
    console.log(err)
    }
}

const InsertVendorAddress = async (req, res) => {
    const vend_id = req.body.vend_id;
    const billing_address_attention = req.body.billing_address_attention;
    const billing_address_country = req.body.billing_address_country;
    const billing_address_city = req.body.billing_address_city;
    const billing_address_state = req.body.billing_address_state;
    const billing_address_pincode = req.body.billing_address_pincode;
    const billing_address_phone   = req.body.billing_address_phone;
    const billing_address_fax = req.body.billing_address_fax;
    console.log(vend_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax);
    
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into tbl_vend_addresses(vend_id ,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,    
          billing_address_phone ,billing_address_fax,add_date_time,add_user_name,add_system_name ,add_ip_address ,status )
          values('${vend_id}','${billing_address_attention}','${billing_address_country}','${billing_address_city}','${billing_address_state}','${billing_address_pincode}','${billing_address_phone}','${billing_address_fax}',getdate(),'Rupesh','${os.hostname()}','${req.ip}','Active')`)
        res.send('Added')
    }
    catch(err){
        console.log(err)
        }
    }
   const SelectCustAddress = async (req, res) => {
    const cust_name = req.body.cust_name;
    console.log(cust_name);
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT  cust_name FROM tbl_cust_addresses WHERE cust_name LIKE '%${cust_name}%';`)
        res.send(result.recordset)
    }
    catch(err){
        console.log(err)
        }
    }

    const TotalCustAddress = async (req, res) => {
        const cust_id = req.body.cust_id;
        console.log(cust_id);
        try{
            await sql.connect(sqlConfig)
            const result = await sql.query(`SELECT * FROM tbl_cust_addresses WHERE cust_name ='${cust_id}';`)
            res.send(result.recordset)
        }
        catch(err){
            console.log(err)
            }
        }
    // const TotalCustAddress

    const TotalVendAddress = async (req, res) => {
        const vend_id = req.body.vend_id;
        console.log(vend_id);
        try{
            await sql.connect(sqlConfig)
            const result = await sql.query(`SELECT * from tbl_vend_addresses WHERE vend_id='${vend_id}';`)
            res.send(result.recordset)
        }
        catch(err){
            console.log(err)
            }
        }

    const DeleteCustAddress = async (req, res) => {
        const sno = req.body.sno;
        const status = req.body.status;
        try{
            await sql.connect(sqlConfig)
            const result = await sql.query(`update tbl_cust_addresses set status='${status}' where sno='${sno}'`)
            res.send('Deleted')
        }
        catch(err){
            console.log(err)
            }
        }

        const DeleteVendAddress = async (req, res) => {
            const sno = req.body.sno;
            const status = req.body.status;
            try{
                await sql.connect(sqlConfig)
                const result = await sql.query(`UPDATE FINSDB.dbo.tbl_vend_addresses  SET status='${status}' WHERE sno='${sno}'`)
                res.send('Deleted')
            }
            catch(err){
                console.log(err)
                }
            }

     const CustAddress = async (req, res) => {
            const sno = req.body.sno;
            try{await sql.connect(sqlConfig)
                const result = await sql.query(`SELECT * from tbl_cust_addresses where sno='${sno}'`)
                res.send(result.recordset[0])
            }
            catch(err){
                console.log(err)
                }
            }

            const VendAddress = async (req, res) => {
                const sno = req.body.sno;
                try{await sql.connect(sqlConfig)
                    const result = await sql.query(`SELECT * from tbl_vend_addresses where sno='${sno}'`)
                    res.send(result.recordset[0])
                }
                catch(err){
                    console.log(err)
                    }
                }
    const UpdateCustAddress = async (req, res) => {
        const sno = req.body.sno;
        const cust_id = req.body.cust_id;
        const billing_address_attention = req.body.billing_address_attention;
        const billing_address_country = req.body.billing_address_country;
        const billing_address_city = req.body.billing_address_city;
        const billing_address_state = req.body.billing_address_state;
        const billing_address_pincode = req.body.billing_address_pincode;
        const billing_address_phone   = req.body.billing_address_phone;
        const billing_address_fax = req.body.billing_address_fax;
        console.log(sno,cust_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax);
        try{
            await sql.connect(sqlConfig)
            const result = await sql.query(`update tbl_cust_addresses set cust_id='${cust_id}',billing_address_attention='${billing_address_attention}',billing_address_country='${billing_address_country}',billing_address_city='${billing_address_city}',billing_address_state='${billing_address_state}',billing_address_pincode='${billing_address_pincode}',billing_address_phone='${billing_address_phone}',billing_address_fax='${billing_address_fax}',update_date_time=getdate(),update_user_name='Rupesh Kumar',
            update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno='${sno}'`)
            res.send('Updated')
        }
        catch(err){
            console.log(err)
            }
        }

        const UpdateVendAddress = async (req, res) => {
            const sno = req.body.sno;
            const vend_id = req.body.vend_id;
            const billing_address_attention = req.body.billing_address_attention;
            const billing_address_country = req.body.billing_address_country;
            const billing_address_city = req.body.billing_address_city;
            const billing_address_state = req.body.billing_address_state;
            const billing_address_pincode = req.body.billing_address_pincode;
            const billing_address_phone   = req.body.billing_address_phone;
            const billing_address_fax = req.body.billing_address_fax;
            console.log(sno,vend_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax);
            try{
                await sql.connect(sqlConfig)
                const result = await sql.query(`update tbl_vend_addresses set vend_id='${vend_id}',billing_address_attention='${billing_address_attention}',billing_address_country='${billing_address_country}',billing_address_city='${billing_address_city}',billing_address_state='${billing_address_state}',billing_address_pincode='${billing_address_pincode}',billing_address_phone='${billing_address_phone}',billing_address_fax='${billing_address_fax}',update_date_time=getdate(),update_user_name='Rupesh Kumar',
                update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno='${sno}'`)
                res.send('Updated')
            }
            catch(err){
                console.log(err)
                }
            }

module.exports = {InsertCustomerAddress,InsertVendorAddress,TotalCustAddress,TotalVendAddress,DeleteCustAddress,DeleteVendAddress,CustAddress,VendAddress,UpdateCustAddress,UpdateVendAddress,SelectCustAddress}