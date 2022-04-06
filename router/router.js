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

router.get('/Totalstate', statesController.TotalStates);
router.post('/deleteState', statesController.deleteState);
router.post('/state', statesController.state);
router.post('/showstate', statesController.showstate);
router.post('/EditState', statesController.EditState);
router.post('/showstateCity', statesController.showstateCity);


router.get('/Totalcountry', countryController.countries);
router.post('/InsertCountry', countryController.InsertCountry);
router.post('/Showcountry', countryController.showcountry);
router.post('/Updatecountry', countryController.updatecountry);
router.post('/deleteCountry', countryController.deletecountry);

router.get('/currency', currencyController.currency);
router.post('/InsertCurrecy', currencyController.InsertCurrency);
router.post('/DeleteCurrency', currencyController.deleteCurrency);
router.post('/UpdateCurrency', currencyController.UpdateCurrency);
router.post('/ShowCurrency', currencyController.ShowCurrency);

router.get('/Totalcity',cityController.city)
router.post('/InsertCity',cityController.insertCity)
router.post('/DeleteCity',cityController.deleteCity)
router.post('/showcity',cityController.showcity)
router.post('/UpdateCity',cityController.updateCity)
router.post('/getCity',cityController.getCity)

router.get('/TotalUnit',unitController.TotalUnit)
router.post('/Unit',unitController.Unit)
router.post('/Showunit',unitController.showunit)
router.post('/UpdateUnit',unitController.UpdateUnit)
router.post('/deleteUnit',unitController.deleteUnit)

router.get('/TotalBank',bankController.TotalBanks)
router.post('/AddBank',bankController.InsertBank)
router.post('/DeleteBank',bankController.DeleteBank)
router.post('/ShowBank',bankController.ShowBank)
router.post('/UpdateBank',bankController.UpdateBank)

router.get('/TotalUser',userController.user)
router.post('/InsertUser',userController.InsertUser)
router.post('/showuser',userController.showuser)
router.post('/updateuser',userController.updateuser)
router.post('/deleteuser',userController.deleteuser)

router.get('/TotalCustomer',customerController.AllCustomer)
router.post('/DeleteCustomer',customerController.DeleteCustomer)
router.post('/AddCustomer',customerController.AddCustomer)
router.post('/ShowCustomer',customerController.Customer)
router.post('/UpdateCustomer',customerController.UpdateCustomer)

router.post('/InsertVendor', vendorController.InsertVendor);
router.post('/DeleteVendor', vendorController.DeleteVendor);
router.get('/ShowVendor', vendorController.showVendor);
router.post('/Vendor',vendorController.Vendor)
router.post('/UpdateVendor',vendorController.UpdateVendor)
module.exports = router;