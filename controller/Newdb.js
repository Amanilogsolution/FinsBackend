const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')


const Newdb = async (req, res) => {
    const dbname = req.body.dbname;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`CREATE DATABASE ${dbname}`)
        if (result) {
            const result = await sql.query(`CREATE TABLE ${dbname}.dbo.tbl_bankmaster 
                (sno bigint IDENTITY(1,1) NOT NULL,
                account_code nvarchar(50) NULL,
                bank_name varchar(50) NULL,
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
                update_date_time datetime NULL, 
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                description varchar(255) NULL,
                bank_uuid varchar(100) NULL
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
	           billing_address_attention varchar(300) NULL,
	           billing_address_country nvarchar(100) NULL,
	           billing_address_city varchar(100) NULL,
	           billing_address_state varchar(100) NULL,
	           billing_address_pincode varchar(100) NULL,
	           billing_address_phone varchar(100) NULL,
	           billing_address_fax varchar(100) NULL,
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
                vend_work_phone varchar(100) NULL,
                vend_phone varchar(100) NULL,
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
                billing_address_phone varchar(100) NULL,
                billing_address_fax varchar(50) NULL,	
                contact_person_name varchar(100) NULL,
                contact_person_email varchar(100) NULL,
                contact_person_work_phone varchar(100) NULL,
                contact_person_phone varchar(100) NULL,
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
                cust_work_phone varchar(100) NULL,
                cust_phone varchar(100) NULL,
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
                billing_address_pincode varchar(100) NULL,
                billing_address_phone varchar(100) NULL,
                billing_address_fax varchar(50) NULL,	
                contact_person_name varchar(100) NULL,
                contact_person_email varchar(100) NULL,
                contact_person_work_phone varchar(100) NULL,
                contact_person_phone varchar(100) NULL,
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

            CREATE TABLE ${dbname}.dbo.tbl_location_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                location_name varchar(100) NULL,
                gstin_no varchar(20) NULL,
                location_uuid varchar(255) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(100) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                status varchar(20) NOT NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_location_address  (
                sno bigint IDENTITY(1,1) NOT NULL,
                location_id varchar(100) NULL,
                location_name varchar(50) NULL,
                gstin_no varchar(15) NULL,
                location_add1 varchar(100) NULL,
                location_add2 varchar(100) NULL,
                location_city varchar(50) NULL,
                location_state varchar(50) NULL,
                location_pin varchar(6) NULL,
                location_country varchar(50) NULL,
                from_date date NULL,
                to_date date NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(30) NULL
                
            );
            
            CREATE TABLE ${dbname}.dbo.tbl_compliance (
                sno bigint IDENTITY(1,1) NOT NULL,
                compliance_type nvarchar(150) NULL,
                nature nvarchar(200) NULL,
                period nvarchar(50) NULL,
                period_name nvarchar(10) NULL,
                from_month date NULL,
                to_month date NULL,
                from_applicable nvarchar(50) NULL,
                due_date date NULL,
                extended_date date NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(30) NULL,
                document_url varchar(300) NULL,
                document_status varchar(100) NULL,
                remark varchar(300) NULL
            );
            
            CREATE TABLE ${dbname}.dbo.tbl_compliances_type (
                sno bigint IDENTITY(1,1) NOT NULL,
                compliance_type varchar(30) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(30) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(30) NULL,
                update_system_name varchar(50) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(20) NULL
            );
            
            CREATE TABLE  ${dbname}.dbo.tbl_items_account (
                sno bigint IDENTITY(1,1) NOT NULL,
                item_type varchar(100) NULL,
                item_name varchar(100) NULL,
                item_unit varchar(30) NULL,
                item_selling_price float NULL,
                sales_account varchar(100) NULL,
                sales_description varchar(300) NULL,
                item_cost_price float NULL,
                purchase_account varchar(100) NULL,
                purchases_description varchar(300) NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(100) NULL,
                add_ip_address varchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name varchar(30) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                status varchar(30) NULL
            );
            
            CREATE TABLE ${dbname}.dbo.tbl_account_type (
                sno bigint IDENTITY(1,1) NOT NULL,
                account_type varchar(50) NULL,
                account_type_code varchar(30) NULL,
                account_description varchar(300) NULL,
                add_user_name varchar(30) NULL,
                add_system_name varchar(30) NULL,
                add_ip_address varchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(50) NULL,
                update_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                status varchar(10) NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_account_name (
                sno bigint IDENTITY(1,1) NOT NULL,
                account_type_code varchar(30) NULL,
                account_name varchar(50) NULL,
                account_name_code varchar(30) NULL,
                account_description varchar(300) NULL,
                add_user_name varchar(30) NULL,
                add_system_name varchar(30) NULL,
                add_ip_address varchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(50) NULL,
                update_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                status varchar(10) NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_sub_account(
                sno bigint IDENTITY(1,1) NOT NULL,
                account_type_code varchar(30) NULL,
                account_name_code varchar(30) NULL,
                account_sub_name varchar(50) NULL,
                account_sub_name_code varchar(30) NULL,
                account_description varchar(300) NULL,
                add_user_name varchar(30) NULL,
                add_system_name varchar(30) NULL,
                add_ip_address varchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(50) NULL,
                update_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                status varchar(10) NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_account_info (
                sno bigint IDENTITY(1,1) NOT NULL,
                account_info_name varchar(100) NULL,
                account_info_type varchar(50) NULL,
                add_user_name varchar(30) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(50) NULL,
                update_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                status varchar(20) NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_gl_sub (
                sno bigint IDENTITY(1,1) NOT NULL,
                charge_code varchar(200) NULL,
                sub_code varchar(200) NULL,
                gl_code varchar(200) NULL,
                company_id varchar(200) NULL,
                add_user_name varchar(100) NULL,
                add_system_name varchar(100) NULL,
                add_ip_address varchar(100) NULL,
                add_date_time datetime NULL,
                update_user_name varchar(100) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(100) NULL,
                update_date_time datetime NULL,
                status varchar(30) NULL
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
