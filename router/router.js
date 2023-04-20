const express = require('express');
const router = express.Router();

// Controller routes
const statesController = require('../controller/Master/state');
const countryController = require('../controller/Master/country');
const currencyController = require('../controller/Master/currency');
const cityController = require('../controller/Master/city');
const unitController = require('../controller/Master/unit');
const bankController = require('../controller/Master/Bank');
const userController = require('../controller/Master/user');
const EmployeeController = require('../controller/Master/employee')
const SubCodeController = require('../controller/Master/SubCode')
const ComplianceTypeController = require('../controller/Master/ComplianceType')
const ComplianceController = require('../controller/AppSetting/Compliance')
const FincialyearController = require('../controller/AppSetting/Fincialyear')
const CRMController = require('../controller/AppSetting/crmMaster')
const PaymentTermController = require('../controller/AppSetting/paymentMaster')
const LocationController = require('../controller/AppSetting/Location')
const customerController = require('../controller/Sales/Customer');
const customerupdatenameController = require('../controller/Sales/CustomerNamesRecord');
const InvoiceController = require('../controller/Sales/Invoice')
const InvoiceSubController = require('../controller/Sales/subinvoice')
const BillController = require('../controller/Purchases/Bill/Bill')
const BillSubController = require('../controller/Purchases/Bill/subbill')
const vendorController = require('../controller/Purchases/vendor');
const AddressController = require('../controller/Addresses');
const LoginController = require('../controller/Login')
const checkAuth = require("../Middleware/checkAuth")
const Token = require('../controller/Token')
const OrganisationController = require('../controller/Org')
const NewdbController = require('../controller/Newdb')
const OrgTableController = require('../controller/Org_table')
const FileUpload = require('../controller/FileUpload')
const Multer = require('../Middleware/multer')
const ChartOfAccountController = require('../controller/ChartOfAccount')
const AccountnameController = require('../controller/AccountName')
const ItemsController = require('../controller/Items')
const AccountMinorCodeController = require('../controller/AccountMinorCode')
const ChartOfAccountMasterController = require('../controller/ChartOfAccountMaster')
const CurrencyAdjustmentController = require('../controller/Currencyadjustment')
const LoginLogsController = require('../controller/LoginLOgs')
const Twofa = require('../controller/2faAuthentication/Twofa')
const UserRightsController = require('../controller/UserRolePermission/userRoll')
const pomasterController = require('../controller/Purchases/PurchaseOrder/po')
const CNController = require('../controller/Sales/CreditNote')
const DNController = require('../controller/Purchases/DebitNote/DN')
const somasterController = require('../controller/Sales/SalesOrder/so')

//Routes

//DB
router.post('/newdb', NewdbController.Newdb);

//Country
router.post('/totalcountry', countryController.countries);
router.get('/activecountries', countryController.Activecountries);
router.post('/insertcountry', countryController.InsertCountry);
router.post('/showcountry', countryController.showcountry);
router.post('/updatecountry', countryController.updatecountry);
router.post('/deletecountry', countryController.deletecountry);
router.post('/importcountry', countryController.ImportCountry)

//States
router.get('/totalstate', statesController.TotalStates);
router.post('/deletestate', statesController.deleteState);
router.post('/state', statesController.state);
router.post('/showstate', statesController.showstate);
router.post('/editstate', statesController.EditState);
router.post('/showactivestate', statesController.showactivestate);
router.post('/importState', statesController.ImportState);

// City
router.get('/totalcity', cityController.city)
router.post('/insertcity', cityController.insertCity)
router.post('/deletecity', cityController.deleteCity)
router.post('/showcity', cityController.showcity)
router.post('/updatecity', cityController.updateCity)
router.post('/getcity', cityController.getCity)
router.post('/importcity', cityController.ImportCity)

//Currency
router.post('/totalcurrency', currencyController.Totalcurrency);
router.post('/insertcurrecy', currencyController.InsertCurrency);
router.post('/deletecurrency', currencyController.deleteCurrency);
router.post('/updatecurrency', currencyController.UpdateCurrency);
router.post('/showcurrency', currencyController.ShowCurrency);
router.post('/ImportCurrency', currencyController.ImportCurrency)
router.post('/activecurrency', currencyController.ActiveCurrency)

//Unit
router.post('/totalunit', checkAuth, unitController.TotalUnit)
router.post('/totalactiveunit', unitController.TotalActiveUnit)
router.post('/insertunit', unitController.InsertUnit)
router.post('/showunit', checkAuth, unitController.showunit)
router.post('/updateunit', unitController.UpdateUnit)
router.post('/deleteunit', unitController.deleteUnit)
router.post('/importunit', unitController.ImportUnit)
router.post('/activeunit', unitController.Activeunit)

//Bank
router.post('/totalbank', bankController.TotalBanks)
router.post('/addbank', bankController.InsertBank)
router.post('/deletebank', bankController.DeleteBank)
router.post('/showbank', bankController.ShowBank)
router.post('/updatebank', bankController.UpdateBank)
router.post('/importbank', bankController.ImportBank)

//User
router.get('/totaluser', userController.Totaluser)
router.post('/insertuser', userController.InsertUser)
router.post('/showuser', userController.showuser)
router.post('/updateuser', userController.updateuser)
router.post('/deleteuser', userController.deleteuser)
router.post('/importuser', userController.ImportUser)
router.post('/updateimage', userController.UpdateImage)
router.post('/activeuser', userController.Activeuser)

//Customer
router.post('/totalcustomer', customerController.AllCustomer)
router.post('/deletecustomer', customerController.DeleteCustomer)
router.post('/addcustomer', customerController.AddCustomer)
router.post('/showcustomer', customerController.Customer)
router.post('/updatecustomer', customerController.UpdateCustomer)
router.post('/unique_cust_id', customerController.Unique_Cust_id)
router.post('/lastcust_id', customerController.Lastcust_id)
router.post('/checkmidvalid', customerController.Checkmidvalid)
router.post('/ImportCustomer', customerController.ImportCustomer)
router.post('/customermastid', customerController.CustomerMastid)
router.post('/activecustomer', customerController.ActiveCustomer)
router.post('/selectedcustomer', customerController.SelectedCustomer)
router.post('/customernameChange', customerupdatenameController.AddCustomerRecord)
router.post('/UpdateCustomerName', customerupdatenameController.UpdateCustomerName)

// Customer Address
router.post('/insertcustaddress', AddressController.InsertCustomerAddress);
router.post('/insertvendaddress', AddressController.InsertVendorAddress);
router.post('/showcustaddress', AddressController.TotalCustAddress);
router.post('/deletecustaddress', AddressController.DeleteCustAddress);
router.post('/custaddress', AddressController.CustAddress);
router.post('/updatecustaddress', AddressController.UpdateCustAddress);
router.post('/selectcustaddress', AddressController.SelectCustAddress)
router.post('/importcustaddress', AddressController.Importcustaddress)
router.post('/searchcustaddress', AddressController.SearchCustAddress)
router.post('/selectvendoraddress', AddressController.getVendorAddress)
router.post('/searchvendaddress', AddressController.SearchVendAddress)


// Vendor
router.post('/insertvendor', vendorController.InsertVendor);
router.post('/deletevendor', vendorController.DeleteVendor);
router.post('/showvendor', vendorController.showVendor);
router.post('/vendor', vendorController.Vendor)
router.post('/updatevendor', vendorController.UpdateVendor)
router.post('/importvendor', vendorController.ImportVendor)
router.post('/vendormastid', vendorController.VendorMastid);
router.post('/activevendor', vendorController.ActiveVendor)
router.post('/activeselectedvendor', vendorController.ActiveSelectedVendor)

// Vendor Address
router.post('/showvendaddress', AddressController.TotalVendAddress);
router.post('/selectvendaddress', AddressController.SelectVendAddress);
router.post('/deletevendaddress', AddressController.DeleteVendAddress);
router.post('/vendoraddress', AddressController.VendAddress);
router.post('/updatevendaddress', AddressController.UpdateVendAddress);
router.post('/importvendaddress', AddressController.Importvendaddress);

// Login
router.post('/userlogin', LoginController.User_login)
router.post('/userlogout', LoginController.User_logout)
router.post('/InsertUserLogin', LoginController.InsertUserLogin)
router.post('/ShowUserLogin', LoginController.showLoginuser)
router.post('/ChangePassword', LoginController.ChangePassword)
router.post('/CheckLoginUser', LoginController.CheckLoginUser)

//Organisation
router.post('/insertorg', OrganisationController.Insertorg)
router.post('/ShowOrganisation', OrganisationController.ShowOrganisation)
router.post('/UpdateOrganisation', OrganisationController.UpdateOrganisation)
router.post('/Token', Token.token)
// router.post('/Totaldata',OrganisationController.InsertTotalTable)
router.post('/Org_table', OrgTableController.Org_table)
router.get('/TotalOrganistion', OrgTableController.TotalOrganisation)

//Location information
router.post('/totallocation', LocationController.TotalLocation)
router.post('/addlocation', LocationController.AddLocation)
router.post('/ShowLocation', LocationController.ShowLocation)
router.post('/updatelocation', LocationController.UpdateLocation)
router.post('/activelocation', LocationController.ActiveLocation)
router.post('/LocationAddress', LocationController.LocationAddress)
router.post('/UpdateLocationAddress', LocationController.UpdateLocationAddress)
router.post('/InsertLocationAddress', LocationController.InsertLocationAddress)
router.post('/importlocationaddress', LocationController.ImportLocationAddress)
router.post('/activelocationaddress', LocationController.ActiveLocationAddress)
router.post('/searchlocationaddress', LocationController.SearchLocationAddress)

router.post('/locationstatus', LocationController.Locationstatus)
// router.post('/lastlocationid',LocationController.LastLocationid)
router.post('/importlocationmaster', LocationController.ImportLocationMaster)

router.post('/Showcompliances', ComplianceController.Showcompliances)
router.post('/insertcompliances', ComplianceController.Insertcompliance)
router.post('/ShowcompliancesData', ComplianceController.ShowcompliancesData)
router.post('/Updatecompliance', ComplianceController.Updatecompliance)
router.post('/pendingcompliances', ComplianceController.PendingCompliances)
router.post('/updatependingcompliances', ComplianceController.UpdatePendingCompliances)

router.post('/ShowcompliancesType', ComplianceTypeController.ShowcompliancesType)
router.post('/InsertcomplianceType', ComplianceTypeController.InsertcomplianceType)
router.post('/ShowcompliancesTypeselect', ComplianceTypeController.ShowcompliancesTypeselect)
router.post('/UpdatecomplianceType', ComplianceTypeController.UpdatecomplianceType)
router.post('/compliancesstatus', ComplianceTypeController.Compliancesstatus)
router.post('/showactivecompliancestype', ComplianceTypeController.ShowActivecompliancesType)

router.post('/compliancestatus', ComplianceController.Compliancestatus)
router.post('/importcompliances', ComplianceController.ImportCompliances)
router.post('/compliancesduedate', ComplianceController.Compliancesduedate)

router.post('/showfincialyear', FincialyearController.Showfincialyear)
router.post('/addfincialyear', FincialyearController.Addfincialyear)
router.post('/updatefincialyear', FincialyearController.Updatefincialyear)
router.post('/statusfincialyear', FincialyearController.Statusfincialyear)
router.post('/selectfincialyear', FincialyearController.Selectfincialyear)
router.post('/getfincialyearid', FincialyearController.Getfincialyearid)
router.post('/updatefinancialcount', FincialyearController.Updatefinancialcount)
router.post('/updatefinancialtwocount', FincialyearController.UpdatefinancialTwocount)
router.post('/getfincialyearnavbar', FincialyearController.GetfincialyearNavbar)

router.post('/insertitems', ItemsController.InsertItems)
router.post('/totalitems', ItemsController.TotalItems)
router.post('/deleteitems', ItemsController.deleteItems)
router.post('/getItems', ItemsController.getItems)
router.post('/updateItems', ItemsController.UpdateItems)
router.post('/activeitems', ItemsController.ActiveItems)
router.post('/activepurchesitems', ItemsController.ActivePurchesItems)

router.post('/FileUpload', Multer, FileUpload)

router.post('/showcoa', ChartOfAccountController.Accounttype)
router.post('/parentaccount', ChartOfAccountController.ParentAccount)
router.post('/parentaccountNumber', ChartOfAccountController.ParentAccountNumber)
router.post('/addaccountname', ChartOfAccountController.AddAccountName)
router.post('/addsubaccountname', ChartOfAccountController.AddSubAccountName)
router.post('/addnewsubaccountname', ChartOfAccountController.AddNewSubAccountName)
router.post('/selectsubaccountname', ChartOfAccountController.SelectSubAccountname)
router.post('/selectsubacconameytype', ChartOfAccountController.SelectSubAcconameByType)
router.post('/countaccounttype', ChartOfAccountController.CountAccounttype)

router.post('/updateaccountname', AccountnameController.UpdateAccountName)
router.post('/insertaccounttype', AccountnameController.InsertAccountType)
router.post('/totalaccountname', AccountnameController.TotalAccountName)
router.post('/accountnamestatus', AccountnameController.AccountnameStatus)
router.post('/selectaccountname', AccountnameController.SelectAccountName)
router.post('/importaccountname', AccountnameController.ImportAccountName)
router.post('/activeaccountname', AccountnameController.ActiveAccountName)

router.post('/showglcode', SubCodeController.GlCode)
router.post('/glsubcode', SubCodeController.GlSubCode)
router.post('/insertglsubcode', SubCodeController.InsertGlSubCode)
router.post('/showtotalsubcode', SubCodeController.ShowTotalSubCode)
router.post('/subcodestatus', SubCodeController.SubCodeStatus)
router.post('/getsubcodedetails', SubCodeController.GetSubCodeDetails)
router.post('/updatesubcodedetails', SubCodeController.UpdateSubCodeDetails)
router.post('/importsubcode', SubCodeController.ImportSubcode)

router.post('/totalaccountminorcode', AccountMinorCodeController.TotalAccountMinorCode)
router.post('/accountminorcodestatus', AccountMinorCodeController.AccountMinorCodeStatus)
router.post('/getaccountminorcode', AccountMinorCodeController.GetAccountMinorCode)
router.post('/updateaccountminorcode', AccountMinorCodeController.UpdateAccountMinorCode)
router.post('/activeaccountminorcode', AccountMinorCodeController.ActiveAccountMinorCode)
router.post('/importaccountminorcode', AccountMinorCodeController.ImportAccountMinorCode)
router.post('/GetAccountMinorCodeName', AccountMinorCodeController.GetAccountMinorCodeName)

router.post('/totalchartofaccount', ChartOfAccountMasterController.TotalChartOfAccount)
router.post('/chartofaccountstatus', ChartOfAccountMasterController.ChartOfAccountStatus)
router.post('/getchartofaccount', ChartOfAccountMasterController.GetChartOfAccount)
router.post('/updatechartofaccount', ChartOfAccountMasterController.UpdateChartOfAccount)
router.post('/importchartofaccount', ChartOfAccountMasterController.ImportChartofAccount)
router.post('/activechartofaccountname', ChartOfAccountMasterController.ActiveChartofAccountname)

router.post('/addcurrencyadjust', CurrencyAdjustmentController.AddCurrencyAdjustment)

router.post('/totalpaymentterm', PaymentTermController.TotalPaymentTerm)
router.post('/deletepaymentterm', PaymentTermController.DeletePaymentTerm)
router.post('/insertpaymentterm', PaymentTermController.InsertPaymentTerm)
router.post('/showpaymentterm', PaymentTermController.ShowPaymentTerm)
router.post('/updatepaymentterm', PaymentTermController.UpdatePaymentTerm)
router.post('/activepaymentterm', PaymentTermController.ActivePaymentTerm)

// router.post('/totalchargecode',ChargeCodeController.TotalChargeCode)
// router.post('/deletechargecode',ChargeCodeController.deleteChargeCode)
// router.post('/addchargecode',ChargeCodeController.AddChargeCode)
// router.post('/getchargecode',ChargeCodeController.getChargeCode)
// router.post('/updatechargecode',ChargeCodeController.UpdateChargeCode)
// router.post('/activechargecodemajor',ChargeCodeController.ActiveChargeCodeMajor)

router.post('/totalcrm', CRMController.Totalcrm)
router.post('/insertcrm', CRMController.insertcrm)
router.post('/deletecrm', CRMController.deleteCrm)
router.post('/getcrm', CRMController.getcrm)
router.post('/updatecrm', CRMController.updatecrm)
router.post('/activecrm', CRMController.Activecrm)

router.post('/insertinvoice', InvoiceController.InsertInvoice)
router.post('/filterinvoice', InvoiceController.filterInvoice)
router.post('/getinvoice', InvoiceController.getInvoice)
router.post('/getsaveinvoice', InvoiceController.getSaveInvoice)
router.post('/updatesaveinvoicetopost', InvoiceController.UpdateSaveInvoiceToPost)
router.post('/getinvoicesbycustomer', InvoiceController.GetInvoicesByCustomer)
router.post('/filterinvoicebycn', InvoiceController.filterInvoicebyCN)

router.post('/insertsubinvoice', InvoiceSubController.InsertSubInvoice)
router.post('/getsubinvoice', InvoiceSubController.getSubInvoice)
router.post('/updatesavesubinvoicetopost', InvoiceSubController.UpdateSaveSubInvoiceToPost)

router.post('/loginlogs', LoginLogsController.LoginLogs)
router.post('/logoutlogs', LoginLogsController.LogoutLogs)

router.post('/Twofa', Twofa.GenerateTwofa)
router.post('/VerifyTwo', Twofa.VerifyTwofa)

router.post('/totalemployee', EmployeeController.TotalEmployee)
router.post('/deleteemployee', EmployeeController.deleteEmployee)
router.post('/insertemployee', EmployeeController.insertemployee)
router.post('/getemployee', EmployeeController.getemployee)
router.post('/updateemployee', EmployeeController.updateemployee)

router.post('/insertbill', BillController.InsertBill)
router.post('/getbilldata', BillController.GetBillData)
router.post('/updatesavebilltopost', BillController.UpdateSaveBillToPost)

router.post('/insertsubbill', BillSubController.inserSubBill)
router.post('/getsubbillitems', BillSubController.GetSubBillItems)
router.post('/updatesavesubbilltopost', BillSubController.UpdateSaveSubBillToPost)

router.post('/filterbillreport', BillController.FilterBillReport)
router.post('/GetSaveBill', BillController.getSaveBill)
router.post('/GetBillVendorid', BillController.GetBillVendorID)
router.post('/filterInvoicebyDN', BillController.filterInvoicebyDN)

router.post('/adduserrole', UserRightsController.AddUserRole)
router.post('/getuserrole', UserRightsController.getUserRole)
router.post('/activeuserrole', UserRightsController.ActiveUserRole)
router.post('/deleteuserrole', UserRightsController.DeleteUserRole)
router.post('/getuserrolepermission', UserRightsController.getUserRolePermission)
router.post('/totaluserrole', UserRightsController.TotalUserRole)

router.post('/InsertPurchaseorder', pomasterController.InsertPurchaseorder)
router.post('/InsertSubPurchaseorder', pomasterController.InsertSubPurchaseorder)
router.post('/getpodetailsvendor', pomasterController.getPoDetailsVendor)
router.post('/getsavepo', pomasterController.getSavePO)
router.post('/filterpo', pomasterController.filterPO)
router.post('/getPoDetailsPreview', pomasterController.getPoDetailsPreview)
router.post('/getSubPoDetailsPreview', pomasterController.getSubPoDetailsPreview)

router.post('/insertcreditnote', CNController.InsertCreditNote)
router.post('/allcndata', CNController.AllCNData)
router.post('/changecstatus', CNController.ChangeCNStatus)
router.post('/getcndata', CNController.getCNData)
router.post('/insertcnsub', CNController.InsertCnSub)
router.post('/selectcnsubdetails', CNController.SelectCnSubDetails)

router.post('/insertdebitnote', DNController.InsertDebitNote)
router.post('/alldndata', DNController.AllDNData)
router.post('/changednstatus', DNController.ChangeDNStatus)
router.post('/getdndata', DNController.getDNData)
router.post('/updatedebitnote', DNController.UpdateDebitNote)
router.post('/insertsubdebitnote', DNController.InsertSubDebitNote)
router.post('/selectdnsubdetails', DNController.SelectDnSubDetails)

router.post('/insertsalesorder', somasterController.InsertSalesorder)

module.exports = router;