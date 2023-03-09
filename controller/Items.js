const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os');
const uuidv1 = require("uuid/v1");


const InsertItems = async (req, res) => {
    const org = req.body.org;
    const item_type = req.body.item_type;
    const item_name = req.body.item_name;
    const item_unit = req.body.item_unit;
    const sac_code = req.body.sac_code;
    const hsn_code = req.body.hsn_code;
    const major_code_id = req.body.major_code_id;
    const major_code = req.body.major_code;
    const chart_of_account = req.body.chart_of_account;
    const chartofaccount_id = req.body.chartofaccount_id;
    const tax_preference = req.body.tax_preference;
    const sales_account = req.body.sales_account;
    const purchase_account = req.body.purchase_account;
    const gst_rate = req.body.gst_rate;
    const add_user_name = req.body.add_user_name;
    const glname = req.body.glname;
    const glcode = req.body.glcode;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` INSERT into ${org}.dbo.tbl_items_account
        (item_type,item_name,item_unit,sac_code,hsn_code,major_code_id,major_code,chart_of_account,chart_of_acct_id,tax_preference,sales_account,purchase_account,gst_rate,
       add_user_name,add_system_name ,add_ip_address ,add_date_time,status,item_uuid,glname,glcode )
       values('${item_type}','${item_name}','${item_unit}','${sac_code}','${hsn_code}','${major_code_id}','${major_code}','${chart_of_account}','${chartofaccount_id}','${tax_preference}','${sales_account}','${purchase_account}','${gst_rate}','${add_user_name}','${os.hostname()}','${req.ip}',getdate(),'Active',
       '${uuidv1()}','${glname}','${glcode}')`)

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
        const result = await sql.query(`update ${org}.dbo.tbl_items_account set status='${status}' WHERE  sno='${sno}';  
        `)
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
    const sno = req.body.sno;
    const org = req.body.org;
    const item_type = req.body.item_type;
    const item_name = req.body.item_name;
    const item_unit = req.body.item_unit;
    const sac_code = req.body.sac_code;
    const hsn_code = req.body.hsn_code;
    const major_code_id = req.body.major_code_id;
    const major_code = req.body.major_code;
    const chart_of_account = req.body.chart_of_account;
    const chartofaccount_id= req.body.chartofaccount_id;
    const tax_preference = req.body.tax_preference;
    const sales_account = req.body.sales_account;
    const purchase_account = req.body.purchase_account;
    const gst_rate = req.body.gst_rate;
    const add_user_name = req.body.add_user_name;

    try {
        await sql.connect(sqlConfig)

        const result = await sql.query(`  update ${org}.dbo.tbl_items_account set item_type='${item_type}',item_name='${item_name}',item_unit='${item_unit}',sac_code='${sac_code}',
        hsn_code='${hsn_code}',major_code_id='${major_code_id}',major_code='${major_code}',chart_of_account='${chart_of_account}',chart_of_acct_id='${chartofaccount_id}',tax_preference='${tax_preference}',
        sales_account='${sales_account}',purchase_account='${purchase_account}',gst_rate='${gst_rate}',update_user_name='${add_user_name}',add_system_name='${os.hostname()}',
        add_ip_address='${req.ip}',add_date_time=GETDATE() WHERE  sno='${sno}';`)
        res.send("updated")
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
