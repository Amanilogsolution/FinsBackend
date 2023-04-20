const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");


const inserSubBill = async (req, res) => {
    const org = req.body.org
    const voucher_no = req.body.voucher_no;
    const bill_no = req.body.bill_no;
    const tabledata = req.body.tabledata;
    const fin_year = req.body.fins_year;
    const userid = req.body.userid;
    try {
        await sql.connect(sqlConfig)
        let result;
        tabledata.map(async (item, index) => {
            result = await sql.query(
                `insert into ${org}.dbo.tbl_sub_bill( voucher_no ,bill_no,location,
                        item_name,emp_name ,glcode ,qty ,rate ,amt ,unit ,file_no ,deduction ,sac_hsn ,net_amt ,fin_year,
                        add_user_name ,add_system_name ,add_ip_address ,add_date_time,status,sub_bill_uuid  )
                     values ('${voucher_no}','${bill_no}','${item.location}','${item.item}','${item.employee}','${item.glcode}',
                     '${item.quantity}','${item.rate}','${item.amount}','${item.unit}','${item.ref_fileno}','${item.deduction}','${item.sac_hsn}','${item.netamount}',
                     '${fin_year}','${userid}','${os.hostname()}','${req.ip}',getDate(),'Active','${uuidv1()}')`
            )
        })
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}



const GetSubBillItems = async (req, res) => {
    const org = req.body.org;
    const voucher_no = req.body.voucher_no;
    try {
        await sql.connect(sqlConfig)
        const items = await sql.query(`select * from ${org}.dbo.tbl_sub_bill with (nolock) WHERE voucher_no='${voucher_no}'`)
        res.send(items.recordset)
    }
    catch (err) {
        res.send(err)

    }
}

const UpdateSaveSubBillToPost = async (req, res) => {
    const org = req.body.org;
    const voucher_no = req.body.voucher_no;
    const new_voucher_no = req.body.new_voucher_no;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` update ${org}.dbo.tbl_sub_bill set voucher_no='${new_voucher_no}'  WHERE voucher_no='${voucher_no}'`)
        if (result.rowsAffected > 0) {
            res.send('Updated')
        }
        else {
            res.send('Error')
        }
    }
    catch (err) {
        res.send(err)
    }

}
module.exports = { inserSubBill, GetSubBillItems,UpdateSaveSubBillToPost }