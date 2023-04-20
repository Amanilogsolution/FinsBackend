const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os');
const uuidv1 = require("uuid/v1");

const InsertItems = async (req, res) => {
    // Name,unit,HSNcode,SACcode,minor_code,major_code_id,minor_code_id,
    // chartofaccount_id,chartofaccount,taxpreference,Purchase,Sales,gstrate,org,user_id

    const org = req.body.org;
    const item_type = req.body.type;
    const item_name = req.body.Name;
    const item_unit = req.body.unit;
    const sac_code = req.body.SACcode;
    const hsn_code = req.body.HSNcode;
    const major_code_id = req.body.major_code_id;

    const chart_of_account = req.body.chartofaccount;
    const chartofaccount_id = req.body.chartofaccount_id;
    const tax_preference = req.body.taxpreference;
    const sales_account = req.body.Sales;
    const purchase_account = req.body.Purchase;
    const gst_rate = req.body.gstrate;
    const add_user_name = req.body.user_id;
    const minor_code = req.body.minor_code;
    const minor_code_id = req.body.minor_code_id;
    const glcode = req.body.glcode;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` INSERT into ${org}.dbo.tbl_items_account
        (item_type,item_name,item_unit,sac_code,hsn_code,major_code_id,chart_of_account,chart_of_acct_id,tax_preference,sales_account,purchase_account,gst_rate,
       add_user_name,add_system_name ,add_ip_address ,add_date_time,status,item_uuid,minor_code_id,minor_code,glcode )
       values('${item_type}','${item_name}','${item_unit}','${sac_code}','${hsn_code}','${major_code_id}','${chart_of_account}','${chartofaccount_id}','${tax_preference}','${sales_account}','${purchase_account}','${gst_rate}','${add_user_name}','${os.hostname()}','${req.ip}',getdate(),'Active',
       '${uuidv1()}','${minor_code_id}','${minor_code}','${glcode}')`)

        if (result.rowsAffected[0] > 0) {
            res.send('Added')
        }
        else {
            res.send('Server error')
        }
    }
    catch (err) {
        res.send(err)
    }
}

const TotalItems = async (req, res) => {
    const org = req.body.org

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_items_account with (nolock) order by sno desc;`)

        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}

const deleteItems = async (req, res) => {
    const org = req.body.org
    const sno = req.body.sno;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_items_account set status='${status}' WHERE  sno='${sno}'`)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}

async function getItems(req, res) {
    const org = req.body.org
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_items_account with (nolock) where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}
const UpdateItems = async (req, res) => {
    // ,,, , , , , , , , , , , , , ,,  
    const sno = req.body.sno;
    const org = req.body.org;
    const item_type = req.body.type;
    const item_name = req.body.Name;
    const item_unit = req.body.Unit;
    const sac_code = req.body.saccode;
    const hsn_code = req.body.hsncode;
    const minor_code = req.body.minor_code;
    const minor_code_id = req.body.minor_code_id;
    const major_code_id = req.body.major_code_id;
    const major_code = req.body.major_code;
    const chart_of_account = req.body.chartofaccount;
    const chartofaccount_id = req.body.chartofaccount_id;
    const tax_preference = req.body.taxpreference;
    const sales_account = req.body.Sales;
    const purchase_account = req.body.Purchase;
    const gst_rate = req.body.gstrate;
    const glcode = req.body.glcode;
    const user_id = req.body.user_id;

    try {
        await sql.connect(sqlConfig)

        const result = await sql.query(`update ${org}.dbo.tbl_items_account set
             item_type='${item_type}',item_name='${item_name}',item_unit='${item_unit}',sac_code='${sac_code}',hsn_code='${hsn_code}',major_code_id='${major_code_id}',chart_of_account='${chart_of_account}',
            chart_of_acct_id='${chartofaccount_id}',tax_preference='${tax_preference}',sales_account='${sales_account}',purchase_account='${purchase_account}',gst_rate='${gst_rate}',minor_code_id='${minor_code_id}',minor_code='${minor_code}',glcode='${glcode}',
            update_user_name='${user_id}',update_system_name='${os.hostname()}' ,update_ip_address='${req.ip}' ,update_date_time=getdate()  WHERE  sno='${sno}'`)
            
        if (result.rowsAffected[0] > 0) {
            res.send("updated")
        }
    }
    catch (err) {
        res.send(err)
    }
}

const ActiveItems = async (req, res) => {
    const org = req.body.org;
    const major_code = req.body.major_code;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from  ${org}.dbo.tbl_items_account with (nolock) where status='Active' and  major_code_id='${major_code}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)

    }

}

const ActivePurchesItems = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_items_account tia WHERE purchase_account='Purchase'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)

    }

}


module.exports = { InsertItems, TotalItems, ActiveItems, deleteItems, getItems, UpdateItems, ActivePurchesItems }
