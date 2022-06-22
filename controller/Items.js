const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

const InsertItems = async (req, res) => {
    const org = req.body.org;
    const item_type = req.body.item_type;
    const item_name = req.body.item_name;
    const item_unit = req.body.item_unit;
    const item_selling_price = req.body.item_selling_price? req.body.item_selling_price:null;
    const sales_account = req.body.sales_account? req.body.sales_account:'';
    const sales_description = req.body.sales_description ? req.body.sales_description:'';
    const item_cost_price = req.body.item_cost_price? req.body.item_cost_price:null;
    const purchase_account = req.body.purchase_account?req.body.purchase_account:'';
    const purchases_description = req.body.purchases_description?req.body.purchases_description:'';
    const add_user_name = req.body.add_user_name;
  
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_items_account (item_type,item_name,item_unit,item_selling_price,sales_account,
            sales_description,item_cost_price,purchase_account,purchases_description,add_user_name,add_system_name,
            add_ip_address,add_date_time,status)
            Values('${item_type}','${item_name}','${item_unit}',${item_selling_price},'${sales_account}','${sales_description}',${item_cost_price},'${purchase_account}',
            '${purchases_description}','${add_user_name}','${os.hostname()}','${req.ip}',getDate(),'Active');`)

        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}


module.exports = {InsertItems}
