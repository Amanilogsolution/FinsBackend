const sql =require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const ShowcompliancesType = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_compliances_type with (nolock)`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)

    }
}

const ShowActivecompliancesType = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_compliances_type with (nolock) where status='Active'`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)

    }
}

const ShowcompliancesTypeselect = async (req, res) => {
    const org = req.body.org
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_compliances_type with (nolock) where sno=${sno}`)
        res.send(result.recordset[0])
    } catch (err) {
        res.send(err)
    }
}

const InsertcomplianceType = async (req, res) =>{
    const org = req.body.org;
    const compliance_type=req.body.compliance_type;
    const user_name = req.body.user_name
    try{
        await sql.connect(sqlConfig)
        const result =await sql.query(`insert into ${org}.dbo.tbl_compliances_type (compliance_type,add_date_time ,add_user_name ,add_system_name ,
            add_ip_address ,status )
            values('${compliance_type}',getDate(),'${user_name}','${os.hostname()}','${req.ip}','Active')`);
        res.send(result)
    }
    catch(err)
    {
        res.send(err)
    }
    
}

const UpdatecomplianceType = async (req, res) =>{
    const org = req.body.org;
    const compliance_type=req.body.compliance_type;
    const user_name = req.body.user_name
    const sno = req.body.sno
    try{
        await sql.connect(sqlConfig)
        const result =await sql.query(`update ${org}.dbo.tbl_compliances_type set compliance_type='${compliance_type}',update_date_time=getDate() ,update_user_name='${user_name}' ,update_system_name='${os.hostname()}',
            update_ip_address='${req.ip}' where sno=${sno}`);
           
        res.send(result)
    }
    catch(err)
    {
        res.send(err)
    }
    
}

const Compliancesstatus = async(req,res) =>{
    const org =req.body.org;
    const sno = req.body.sno;
    const status =req.body.status;
    try{
      await sql.connect(sqlConfig)
      const result =await sql.query(`update ${org}.dbo.tbl_compliances_type set status='${status}' where sno=${sno}`)
      res.status(200).send({message:"updated"})
    }
    catch(err){
        res.send(err)
    }
}

module.exports = { ShowcompliancesType,InsertcomplianceType,ShowcompliancesTypeselect,UpdatecomplianceType,Compliancesstatus ,ShowActivecompliancesType}
