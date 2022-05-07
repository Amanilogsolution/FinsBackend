const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')


const Newdb = async (req, res) => {
    const dbname = req.body.dbname;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`CREATE DATABASE ${dbname}`)
        if (result) {
            const result = await sql.query(`CREATE TABLE ${dbname}.dbo.tbl_bankmaster (sno bigint IDENTITY(1,1) NOT NULL,account_code nvarchar(50) NULL,bank_name varchar(50) NULL,
                account_no nvarchar(50) NULL,
                address_line1 varchar(255) NULL,
                address_line2 varchar(255) NULL,
                branch varchar(50) NULL,
                state varchar(50) NULL,
                city varchar(30) NULL,
                pincode bigint NULL,
                ifsc_code varchar(30) NULL,
                status varchar(30) NULL,
                ac_type varchar(50) NULL,
                acname varchar(50) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL, update_user_name varchar(50) NULL,update_system_name varchar(100) NULL,update_ip_address varchar(50) NULL,description varchar(255) NULL,bank_uuid varchar(100) NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_currency (
                sno bigint IDENTITY(1,1) NOT NULL,
                country_code  varchar(100) NULL,
                country_name varchar(100) NULL,
                currency_name varchar(100) NULL,
                currency_code varchar(100) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(30) NULL,
                currency_uuid varchar(100) NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_fin_year (
                sno bigint IDENTITY(1,1) NOT NULL,
                fin_year  varchar(50) NULL,
                year varchar(20) NULL,
                from_date varchar(20) NULL,
                to_date varchar(20) NULL,
                mcust_totalid varchar(50) NULL,
                cust_totalid varchar(50) NULL,
                finyear_uuid varchar(100) NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_unit (
                sno bigint IDENTITY(1,1) NOT NULL,
                unit_symbol  varchar(100) NULL,
                unit_name varchar(100) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(30) NULL,
                unit_uuid varchar(100) NULL
            );
            
            CREATE TABLE ${dbname}.dbo.tbl_cust_addresses (
	           sno bigint IDENTITY(1,1) NOT NULL,
	           cust_id varchar(50) NULL,
	           cust_name varchar(100) NULL,
               gst_no  varchar(30) NULL,
	           billing_address_attention varchar(100) NULL,
	           billing_address_country nvarchar(50) NULL,
	           billing_address_city varchar(50) NULL,
	           billing_address_state varchar(50) NULL,
	           billing_address_pincode bigint NULL,
	           billing_address_phone bigint NULL,
	           billing_address_fax varchar(50) NULL,
	           add_date_time datetime NULL,
	           add_user_name varchar(50) NULL,
	           add_system_name varchar(50) NULL,
	           add_ip_address varchar(30) NULL,
	           update_date_time datetime NULL,
	           update_user_name varchar(50) NULL,
	           update_system_name varchar(100) NULL,
	           update_ip_address varchar(50) NULL,
	           status varchar(50) NULL,
	           custaddress_uuid varchar(100) NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_vend_addresses (
                sno bigint IDENTITY(1,1) NOT NULL,
                vend_id varchar(30) NULL,
                gst_no  varchar(30) NULL,
                billing_address_attention varchar(100) NULL,
                billing_address_country varchar(50) NULL,
                billing_address_city varchar(50) NULL,
                billing_address_state varchar(50) NULL,
                billing_address_pincode bigint NULL,
                billing_address_phone bigint NULL,
                billing_address_fax varchar(50) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(50) NULL,
                vendaddress_uuid varchar(100) NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_new_vendor (
                sno bigint IDENTITY(1,1) NOT NULL,
                mast_id varchar(30) NULL,
                vend_id varchar(30) NULL,
                vend_name varchar(100) NULL,
                company_name varchar(100) NULL,
                vend_display_name varchar(100) NULL,
                vend_email varchar(30) NULL,
                vend_work_phone bigint NULL,
                vend_phone bigint NULL,
                skype_detail varchar(100) NULL,
                designation varchar(30) NULL,
                department varchar(30) NULL,
                website varchar(255) NULL,
                gst_treatment varchar(50) NULL,
                gstin_uin varchar(30) NULL,
                pan_no  varchar(30) NULL,
                source_of_supply varchar(30) NULL,
                currency varchar(30) NULL,
                opening_balance varchar(50) NULL,
                payment_terms varchar(50) NULL,
                tds varchar(50) NULL,
                enable_portal varchar(30) NULL,
                portal_language varchar(30) NULL,
                facebook_url varchar(255) NULL,
                twitter_url varchar(255) NULL,
                billing_address_attention varchar(100) NULL,
                billing_address_country varchar(50) NULL,
                billing_address_city varchar(50) NULL,
                billing_address_state varchar(50) NULL,
                billing_address_pincode bigint NULL,
                billing_address_phone bigint NULL,
                billing_address_fax varchar(50) NULL,	
                contact_person_name varchar(100) NULL,
                contact_person_email varchar(100) NULL,
                contact_person_work_phone bigint NULL,
                contact_person_phone bigint NULL,
                contact_person_skype varchar(100) NULL,
                contact_person_designation varchar(100) NULL,
                contact_person_department varchar(100) NULL,
                remark varchar(255) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(50) NULL,
                newvend_uuid varchar(100) NULL
            );
            
            CREATE TABLE ${dbname}.dbo.tbl_new_customer (
                sno bigint IDENTITY(1,1) NOT NULL,
                mast_id varchar(30) NULL,
                cust_id varchar(30) NULL,
                cust_type varchar(50) NULL,
                cust_name varchar(100) NULL,
                company_name varchar(100) NULL,
                cust_display_name varchar(100) NULL,
                cust_email varchar(30) NULL,
                cust_work_phone bigint NULL,
                cust_phone bigint NULL,
                skype_detail varchar(100) NULL,
                designation varchar(30) NULL,
                department varchar(30) NULL,
                website varchar(255) NULL,
                gst_treatment varchar(50) NULL,
                gstin_uin varchar(30) NULL,
                pan_no  varchar(30) NULL,
                place_of_supply varchar(80) NULL,
                tax_preference varchar(50) NULL,
                exemption_reason varchar(50) NULL,
                currency varchar(30) NULL,
                opening_balance varchar(50) NULL,
                payment_terms varchar(50) NULL,
                enable_portal varchar(30) NULL,
                portal_language varchar(30) NULL,
                facebook_url varchar(255) NULL,
                twitter_url varchar(255) NULL,
                billing_address_attention varchar(100) NULL,
                billing_address_country varchar(50) NULL,
                billing_address_city varchar(50) NULL,
                billing_address_state varchar(50) NULL,
                billing_address_pincode bigint NULL,
                billing_address_phone bigint NULL,
                billing_address_fax varchar(50) NULL,	
                contact_person_name varchar(100) NULL,
                contact_person_email varchar(100) NULL,
                contact_person_work_phone bigint NULL,
                contact_person_phone bigint NULL,
                contact_person_skype varchar(100) NULL,
                contact_person_designation varchar(100) NULL,
                contact_person_department varchar(100) NULL,
                remark varchar(255) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(50) NULL,
                newcust_uuid varchar(100) NULL
            );
            `)
            res.send(
                {
                    "status": "true",
                    "message": "Table and Database created",
                    "statusCode": 200
                }
            )
        }


    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { Newdb }
