// const sql = require('mssql')
// const sqlConfig = require('../config.js')
// const os = require('os')
// const uuidv1 = require("uuid/v1");

// const AllAccountInfo = async (req, res) => {
//     const org = req.body.org;
//     try {
//         await sql.connect(sqlConfig)
//         const result = await sql.query(`SELECT * from ${org}.dbo.tbl_account_info with (nolock);`)
//         res.send(result.recordset)
//     }
//     catch (err) {
//         res.send(err)
//     }
// }

// const AllAccountsalesInfo = async (req, res) => {
//     const org = req.body.org;
//     try {
//         await sql.connect(sqlConfig)
//         const result = await sql.query(`SELECT account_info_name from ${org}.dbo.tbl_account_info with (nolock)
//         WHERE status='Active' AND account_info_type='Sales';`)
//         res.send(result.recordset)
//     }
//     catch (err) {
//         res.send(err)
//     }
// }

// const AllAccountpurchaseInfo = async (req, res) => {
//     const org = req.body.org;
//     try {
//         await sql.connect(sqlConfig)
//         const result = await sql.query(`SELECT account_info_name from ${org}.dbo.tbl_account_info with (nolock)
//         WHERE status='Active' AND account_info_type='Purchase';`)
//         res.send(result.recordset)
//     }
//     catch (err) {
//         res.send(err)
//     }
// }

// const AccountInfoStatus = async (req, res) => {
//     const org = req.body.org;
//     const status = req.body.status;
//     const sno = req.body.sno;
//     try {
//         await sql.connect(sqlConfig)
//         const result = await sql.query(`update ${org}.dbo.tbl_account_info set status='${status}' where sno='${sno}';`)
//         res.send(result.recordset[0])
//     }
//     catch (err) {
//         res.send(err)
//     }
// }

// const InsertAccountInfo = async (req, res) => {
//     const org = req.body.org;
//     const account_info_name = req.body.account_info_name;
//     const account_info_type = req.body.account_info_type;
//     const User_id = req.body.User_id;
//     try {
//         await sql.connect(sqlConfig)
//         const result = await sql.query(`insert into ${org}.dbo.tbl_account_info (account_info_name,account_info_type,add_user_name,add_system_name,
//         add_ip_address,add_date_time,status)
//         values('${account_info_name}','${account_info_type}','${User_id}','${os.hostname()}','${req.ip}',getDate(),'Active');`)
//         res.send(result.recordset[0])
//     }
//     catch (err) {
//         res.send(err)
//     }
// }

// const SelectAccountInfo = async (req, res) => {
//     const org = req.body.org;
//     const sno = req.body.sno;

//     try {
//         await sql.connect(sqlConfig)
//         const result = await sql.query(`select * from ${org}.dbo.tbl_account_info with (nolock) where sno='${sno}'`)
//         res.send(result.recordset[0])
//     }
//     catch (err) {
//         res.send(err)
//     }
// }

// const UpdateAccountInfo = async (req, res) => {
//     const org = req.body.org;
//     const sno = req.body.sno;
//     const account_info_name = req.body.account_info_name;
//     const account_info_type = req.body.account_info_type;
//     const User_id = req.body.User_id;

//     try {
//         await sql.connect(sqlConfig)
//         const result = await sql.query(`update ${org}.dbo.tbl_account_info set account_info_name='${account_info_name}',account_info_type='${account_info_type}',update_user_name='${User_id}',
//         update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=GETDATE() WHERE sno='${sno}'; `)
//         res.send(result.recordset[0])
//     }
//     catch (err) {
//         res.send(err)
//     }
// }


// const ImportAccountInfo = (req, res) => {
//     const datas = req.body.datas;
//     const org = req.body.org;
//     const User_id = req.body.User_id;

//     sql.connect(sqlConfig).then(() => {

//         sql.query(`INSERT INTO ${org}.dbo.tbl_account_info (account_info_name,account_info_type,status,add_date_time,add_user_name,add_system_name,add_ip_address) 
//                     VALUES ${datas.map(item =>
//             `('${item.account_info_name}','${item.account_info_type}','Active',getdate(),'${User_id}','${os.hostname()}','${req.ip}')`).join(', ')}`)

//         res.send("Data Added")
//     }



//     )
// }



// module.exports = { AllAccountInfo, AllAccountsalesInfo, AllAccountpurchaseInfo, AccountInfoStatus, InsertAccountInfo, SelectAccountInfo, UpdateAccountInfo, ImportAccountInfo }
