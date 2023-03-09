const sql = require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");


const AddUserRole = async (req, res) => {
    const org = req.body.org
    const roles = req.body.roles;
    const role_id = req.body.role_id;
    const description = req.body.description;

    const sales_all = req.body.sales_all;

    const customer_view = req.body.customer_view;
    const customer_create = req.body.customer_create;
    const customer_edit = req.body.customer_edit;
    const customer_delete = req.body.customer_delete;

    const invoice_view = req.body.invoice_view;
    const invoice_create = req.body.invoice_create;
    const invoice_edit = req.body.invoice_edit;
    const invoice_delete = req.body.invoice_delete;

    const purchases_all = req.body.purchases_all;

    const vendor_view = req.body.vendor_view;
    const vendor_create = req.body.vendor_create
    const vendor_edit = req.body.vendor_edit;
    const vendor_delete = req.body.vendor_delete;

    const bills_view = req.body.bills_view;
    const bills_create = req.body.bills_create;
    const bills_edit = req.body.bills_edit;
    const bills_delete = req.body.bills_delete;

    const accountant_all = req.body.accountant_all;

    const chartof_accounts_view = req.body.chartof_accounts_view;
    const chartof_accounts_create = req.body.chartof_accounts_create;
    const chartof_accounts_edit = req.body.chartof_accounts_edit;
    const chartof_accounts_delete = req.body.chartof_accounts_delete;

    const currency_addj_view = req.body.currency_addj_view;
    const currency_addj_create = req.body.currency_addj_create;
    const currency_addj_edit = req.body.currency_addj_edit;
    const currency_addj_delete = req.body.currency_addj_delete;


    const setting_all = req.body.setting_all;

    const org_profile_view = req.body.org_profile_view;
    const org_profile_create = req.body.org_profile_create;
    const org_profile_edit = req.body.org_profile_edit;
    const org_profile_delete = req.body.org_profile_delete;

    const payment_terms_view = req.body.payment_terms_view;
    const payment_terms_create = req.body.payment_terms_create;
    const payment_terms_edit = req.body.payment_terms_edit;
    const payment_terms_delete = req.body.payment_terms_delete;

    const fincial_year_view = req.body.fincial_year_view;
    const fincial_year_create = req.body.fincial_year_create;
    const fincial_year_edit = req.body.fincial_year_edit;
    const fincial_year_delete = req.body.fincial_year_delete;

    const branch_view = req.body.branch_view;
    const branch_create = req.body.branch_create;
    const branch_edit = req.body.branch_edit;
    const branch_delete = req.body.branch_delete;

    const crm_view = req.body.crm_view;
    const crm_create = req.body.crm_create;
    const crm_edit = req.body.crm_edit;
    const crm_delete = req.body.crm_delete;

    const compliances_view = req.body.compliances_view;
    const compliances_create = req.body.compliances_create;
    const compliances_edit = req.body.compliances_edit;
    const compliances_delete = req.body.compliances_delete;

    const roles_view = req.body.roles_view;
    const roles_create = req.body.roles_create;
    const roles_edit = req.body.roles_edit;
    const roles_delete = req.body.roles_delete;

    const items_view = req.body.items_view;
    const items_create = req.body.items_create;
    const items_edit = req.body.items_edit;
    const items_delete = req.body.items_delete;

    const master_all = req.body.master_all;

    const country_view = req.body.country_view;
    const country_create = req.body.country_create;
    const country_edit = req.body.country_edit;
    const country_delete = req.body.country_delete;

    const state_view = req.body.state_view;
    const state_create = req.body.state_create;
    const state_edit = req.body.state_edit;
    const state_delete = req.body.state_delete;

    const city_view = req.body.city_view;
    const city_create = req.body.city_create;
    const city_edit = req.body.city_edit;
    const city_delete = req.body.city_delete;

    const currency_view = req.body.currency_view;
    const currency_create = req.body.currency_create;
    const currency_edit = req.body.currency_edit;
    const currency_delete = req.body.currency_delete;

    const unit_view = req.body.unit_view;
    const unit_create = req.body.unit_create;
    const unit_edit = req.body.unit_edit;
    const unit_delete = req.body.unit_delete;

    const banking_view = req.body.banking_view;
    const banking_create = req.body.banking_create;
    const banking_edit = req.body.banking_edit;
    const banking_delete = req.body.banking_delete;

    const comp_type_view = req.body.comp_type_view;
    const comp_type_create = req.body.comp_type_create;
    const comp_type_edit = req.body.comp_type_edit;
    const comp_type_delete = req.body.comp_type_delete;

    const users_view = req.body.users_view;
    const users_create = req.body.users_create;
    const users_edit = req.body.users_edit;
    const users_delete = req.body.users_delete;

    const employee_view = req.body.employee_view;
    const employee_create = req.body.employee_create;
    const employee_edit = req.body.employee_edit;
    const employee_delete = req.body.employee_delete;

    const reports_all = req.body.reports_all;

    const reports_bill_view = req.body.reports_bill_view;
    const reports_bill_create = req.body.reports_bill_create;
    const reports_bill_edit = req.body.reports_bill_edit;
    const reports_bill_delete = req.body.reports_bill_delete;

    const reports_invoice_view = req.body.reports_invoice_view;
    const reports_invoice_create = req.body.reports_invoice_create;
    const reports_invoice_edit = req.body.reports_invoice_edit;
    const reports_invoice_delete = req.body.reports_invoice_delete;

    const user_id = req.body.user_id
    const uuid = uuidv1()

    try {
        await sql.connect(sqlConfig)

        const duplicate = await sql.query(`select roles from ${org}.dbo.user_roles where roles='${roles}' and status='Active'`)

        if (duplicate.recordset.length > 0) {
            res.send('Role Already')
        }
        else {
            const result = await sql.query(`insert into ${org}.dbo.user_roles(roles ,roles_id,description ,
                sales_all,customer_view,customer_create,customer_edit,customer_delete,
                invoice_view,invoice_create,invoice_edit,invoice_delete,
                purchases_all,
                vendor_view,vendor_create,vendor_edit,vendor_delete,
                bills_view,bills_create,bills_edit,bills_delete,
                accountant_all,
                chartof_accounts_view,chartof_accounts_create,chartof_accounts_edit,chartof_accounts_delete,
                currency_addj_view,currency_addj_create,currency_addj_edit,currency_addj_delete,
                setting_all,
                org_profile_view,org_profile_create,org_profile_edit,org_profile_delete,     
                payment_terms_view,payment_terms_create,payment_terms_edit,payment_terms_delete,
                
                fincial_year_view,fincial_year_create,fincial_year_edit,fincial_year_delete,
                branch_view,branch_create,branch_edit,branch_delete,
                crm_view,crm_create,crm_edit,crm_delete,

                compliances_view,compliances_create,compliances_edit,compliances_delete,
                roles_view,roles_create,roles_edit,roles_delete,
                items_view,items_create,items_edit,items_delete,
                master_all,

                country_view,country_create,country_edit,country_delete,
                state_view,state_create,state_edit,state_delete,
                city_view,city_create,city_edit,city_delete,

                currency_view,currency_create,currency_edit,currency_delete,
                unit_view,unit_create,unit_edit,unit_delete,
                banking_view,banking_create,banking_edit,banking_delete,

                comp_type_view,comp_type_create,comp_type_edit,comp_type_delete ,
                users_view,users_create,users_edit,users_delete,
                employee_view,employee_create,employee_edit,employee_delete,
                reports_all,
                
                reports_bill_view,reports_bill_create,reports_bill_edit,reports_bill_delete,
                reports_invoice_view,reports_invoice_create,reports_invoice_edit,reports_invoice_delete,
                
                add_user_name,add_system_name ,add_ip_address,add_date_time,status,roles_uuid )
                      
      values('${roles}','${role_id}','${description}','${sales_all}',
      '${customer_view}','${customer_create}','${customer_edit}','${customer_delete}',
      '${invoice_view}','${invoice_create}','${invoice_edit}','${invoice_delete}',
      '${purchases_all}',
      '${vendor_view}','${vendor_create}','${vendor_edit}','${vendor_delete}',
      '${bills_view}','${bills_create}','${bills_edit}','${bills_delete}',
      '${accountant_all}',
      '${chartof_accounts_view}','${chartof_accounts_create}','${chartof_accounts_edit}','${chartof_accounts_delete}',
      '${currency_addj_view}','${currency_addj_create}','${currency_addj_edit}','${currency_addj_delete}',
      '${setting_all}',
      '${org_profile_view}','${org_profile_create}','${org_profile_edit}','${org_profile_delete}',
      '${payment_terms_view}','${payment_terms_create}','${payment_terms_edit}','${payment_terms_delete}',

      '${fincial_year_view}','${fincial_year_create}','${fincial_year_edit}','${fincial_year_delete}',
      '${branch_view}','${branch_create}','${branch_edit}','${branch_delete}',
      '${crm_view}','${crm_create}','${crm_edit}','${crm_delete}',

      '${compliances_view}','${compliances_create}','${compliances_edit}','${compliances_delete}',
      '${roles_view}','${roles_create}','${roles_edit}','${roles_delete}',
      '${items_view}','${items_create}','${items_edit}','${items_delete}',
      '${master_all}',

      '${country_view}','${country_create}','${country_edit}','${country_delete}',
      '${state_view}','${state_create}','${state_edit}','${state_delete}',
      '${city_view}','${city_create}','${city_edit}','${city_delete}',

      '${currency_view}','${currency_create}','${currency_edit}','${currency_delete}',
      '${unit_view}','${unit_create}','${unit_edit}','${unit_delete}',
      '${banking_view}','${banking_create}','${banking_edit}','${banking_delete}',
      
      '${comp_type_view}','${comp_type_create}','${comp_type_edit}','${comp_type_delete}',
      '${users_view}','${users_create}','${users_edit}','${users_delete}',
      '${employee_view}','${employee_create}','${employee_edit}','${employee_delete}',
      '${reports_all}',
      '${reports_bill_view}','${reports_bill_create}','${reports_bill_edit}','${reports_bill_delete}',
      '${reports_invoice_view}','${reports_invoice_create}','${reports_invoice_edit}','${reports_invoice_delete}',
      '${user_id}','${os.hostname()}','${req.ip}',getDate(),'Active','${uuid}')`)

            res.send('Added')
        }
    }
    catch (err) {
        res.send(err)
    }
}

const TotalUserRole = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const totalresult = await sql.query(`select * from ${org}.dbo.user_roles `)
        res.send(totalresult.recordset)
    }
    catch (err) {
        res.send(err)

    }
}

const getUserRole = async (req, res) => {
    const org = req.body.org;
    const role = req.body.role;
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from ${org}.dbo.user_roles where roles='${role}' and status='Active'`)
        res.send(duplicate.recordset[0])
    }
    catch (err) {
        res.send(err)

    }
}

const ActiveUserRole = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const role = await sql.query(`select roles from ${org}.dbo.user_roles where status='Active'`)
        res.send(role.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const DeleteUserRole = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;

    try {
        await sql.connect(sqlConfig)
        const role = await sql.query(`update ${org}.dbo.user_roles set status='${status}' where sno='${sno}'`)
        res.send(role.recordset)
    }
    catch (err) {
        res.send(err)
    }
}
const getUserRolePermission = async (req, res) => {
    const org = req.body.org;
    const role = req.body.role;
    const type = req.body.type;
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select ${type}_create,${type}_edit,${type}_delete,${type}_view  from ${org}.dbo.user_roles where roles='${role}' and status='Active'`)
        res.send(duplicate.recordset[0])
    }
    catch (err) {
        res.send(err)

    }

}


module.exports = { AddUserRole,TotalUserRole, getUserRole, ActiveUserRole,DeleteUserRole, getUserRolePermission }