const express = require('express');
const router = express.Router();

const statesController = require('../controller/state');
const countryController = require('../controller/country');
const currencyController = require('../controller/currency');
const cityController = require('../controller/city');
const unitController = require('../controller/unit');
const bankController = require('../controller/Bank');
const userController = require('../controller/user');
const customerController = require('../controller/Customer');
const vendorController = require('../controller/vendor');
const AddressController = require('../controller/Addresses');
const LoginController = require('../controller/Login')
const checkAuth = require("../Middleware/checkAuth")
const Token = require('../controller/Token')
const OrganisationController = require('../controller/Org')
const NewdbController = require('../controller/Newdb')
const OrgTableController = require('../controller/Org_table')
const LocationController = require('../controller/Location')

router.post('/newdb', NewdbController.Newdb);

router.get('/totalstate', statesController.TotalStates);
router.post('/deletestate', statesController.deleteState);
router.post('/state', statesController.state);
router.post('/showstate', statesController.showstate);
router.post('/editstate', statesController.EditState);
router.post('/showstatecity', statesController.showstateCity);
router.post('/importState', statesController.ImportState);


router.post('/totalcountry', countryController.countries);
router.post('/insertcountry', countryController.InsertCountry);
router.post('/showcountry', countryController.showcountry);
router.post('/updatecountry', countryController.updatecountry);
router.post('/deletecountry', countryController.deletecountry);
router.post('/checkimportcountry',countryController.CheckimportCountry)


router.post('/currency', currencyController.currency);
router.post('/insertcurrecy', currencyController.InsertCurrency);
router.post('/deletecurrency', currencyController.deleteCurrency);
router.post('/updatecurrency', currencyController.UpdateCurrency);
router.post('/showcurrency', currencyController.ShowCurrency);
router.post('/ImportCurrency', currencyController.ImportCurrency)

router.get('/totalcity',cityController.city)
router.post('/insertcity',cityController.insertCity)
router.post('/deletecity',cityController.deleteCity)
router.post('/showcity',cityController.showcity)
router.post('/updatecity',cityController.updateCity)
router.post('/getcity',cityController.getCity)
router.post('/importcity',cityController.ImportCity)

router.post('/totalunit',checkAuth,unitController.TotalUnit)
router.post('/unit',unitController.Unit)
router.post('/showunit',checkAuth,unitController.showunit)
router.post('/updateunit',unitController.UpdateUnit)
router.post('/deleteunit',unitController.deleteUnit)
router.post('/importunit',unitController.ImportUnit)


router.get('/totalbank',bankController.TotalBanks)
router.post('/addbank',bankController.InsertBank)
router.post('/deletebank',bankController.DeleteBank)
router.post('/showbank',bankController.ShowBank)
router.post('/updatebank',bankController.UpdateBank)

router.get('/totaluser',userController.user)
router.post('/insertuser',userController.InsertUser)
router.post('/showuser',userController.showuser)
router.post('/updateuser',userController.updateuser)
router.post('/deleteuser',userController.deleteuser)

router.get('/totalcustomer',customerController.AllCustomer)
router.post('/deletecustomer',customerController.DeleteCustomer)
router.post('/addcustomer',customerController.AddCustomer)
router.post('/showcustomer',customerController.Customer)
router.post('/updatecustomer',customerController.UpdateCustomer)
router.get('/customerid',customerController.Customer_id)
router.post('/unique_cust_id',customerController.Unique_Cust_id)
router.get('/lastcust_id',customerController.Lastcust_id)
router.post('/ImportCustomer',customerController.ImportCustomer)

router.post('/insertvendor', vendorController.InsertVendor);
router.post('/deletevendor', vendorController.DeleteVendor);
router.get('/showvendor', vendorController.showVendor);
router.post('/vendor',vendorController.Vendor)
router.post('/updatevendor',vendorController.UpdateVendor)
router.get('/vendorid',vendorController.Vendor_id)

router.post('/insertcustaddress', AddressController.InsertCustomerAddress);
router.post('/insertvendaddress', AddressController.InsertVendorAddress);
router.post('/showcustaddress', AddressController.TotalCustAddress);
router.post('/deletecustaddress', AddressController.DeleteCustAddress);
router.post('/custaddress', AddressController.CustAddress);
router.post('/updatecustaddress', AddressController.UpdateCustAddress);
router.post('/SelectCustAddress',AddressController.SelectCustAddress)

router.post('/showvendaddress', AddressController.TotalVendAddress);
router.post('/deletevendaddress', AddressController.DeleteVendAddress);
router.post('/vendoraddress', AddressController.VendAddress);
router.post('/updatevendaddress', AddressController.UpdateVendAddress);

router.post('/userlogin',LoginController.User_login)
router.post('/userlogout',LoginController.User_logout)
router.post('/InsertUserLogin',LoginController.InsertUserLogin)
router.post('/ShowUserLogin',LoginController.showLoginuser)

router.post('/SchemaCreate',OrganisationController.Insertorg)

router.post('/Token',Token.token)
router.post('/Totaldata',OrganisationController.InsertTotalTable)
router.post('/Org_table',OrgTableController.Org_table)
router.get('/TotalOrganistion',OrgTableController.TotalOrganisation)

router.post('/TotalLocation',LocationController.TotalLocation)
router.post('/AddLocation',LocationController.AddLocation)
router.post('/ShowLocation',LocationController.ShowLocation)
router.post('/UpdateLocation',LocationController.UpdateLocation)


router.post('/LocationAddress',LocationController.LocationAddress)
router.post('/LocationAddress',LocationController.LocationAddress)
router.post('/UpdateLocationAddress',LocationController.UpdateLocationAddress)
router.post('/InsertLocationAddress',LocationController.InsertLocationAddress)





module.exports = router;