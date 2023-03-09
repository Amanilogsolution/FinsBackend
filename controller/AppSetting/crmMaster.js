const sql =require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')

const Totalcrm = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` SELECT *,convert(varchar(15),from_date,121) as Joindate  from ${org}.dbo.tbl_crm_master tcm with (nolock)`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}

const insertcrm = async (req, res) => {
    const org = req.body.org
    const user_name = req.body.user_name;
    const type = req.body.type;
    const cust_vend = req.body.cust_vend;
    const User_id= req.body.User_id;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from ${org}.dbo.tbl_crm_master where cust_vend='${cust_vend}' and status = 'Active' and type='${type}'`)
        if(duplicate.rowsAffected > 0){
            const update = await sql.query(`update ${org}.dbo.tbl_crm_master set status='Deactive',to_date='${to_date}' where status='Active' and cust_vend='${cust_vend}'`) 
            const result = await sql.query(` insert into ${org}.dbo.tbl_crm_master(user_name,type,cust_vend,add_date_time,add_user_name,
                add_system_name,add_ip_address,status,from_date)
                values('${user_name}','${type}','${cust_vend}',getDate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${from_date}');`)
            res.send('Added')
        }else{
        const result = await sql.query(` insert into ${org}.dbo.tbl_crm_master(user_name,type,cust_vend,add_date_time,add_user_name,
            add_system_name,add_ip_address,status,from_date)
            values('${user_name}','${type}','${cust_vend}',getDate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${from_date}');`)
        res.send('Added')
        }
     
       
    }
    catch (err) {
        res.send(err)
    }
}

const deleteCrm = async (req, res) => {
    const org = req.body.org
    const sno = req.body.sno;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_crm_master set status='${status}' where sno='${sno}' `)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}

const getcrm = async (req,res) => {
    const org = req.body.org
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` select *,convert(varchar(15),from_date,121) as Joindate from ${org}.dbo.tbl_crm_master with (nolock) WHERE sno = '${sno}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }

}

const updatecrm = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org
    const user_name = req.body.user_name;
    const type = req.body.type;
    const cust_vend = req.body.cust_vend;
    const User_id= req.body.User_id;
    const from_date = req.body.from_date
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_crm_master set user_name='${user_name}',type='${type}',cust_vend='${cust_vend}', update_date_time=getDate(),
        update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address ='${req.ip}',from_date='${from_date}' where sno='${sno}'`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}

const Activecrm = async (req, res)=>{
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select  uname  as CRMNAME from  NEWAWLDB.dbo.User_Rights with (nolock) where  uDept in (6,1)
        and uActive=1    order by uName asc`)
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }

}

module.exports={Totalcrm,insertcrm,deleteCrm,getcrm,updatecrm,Activecrm}