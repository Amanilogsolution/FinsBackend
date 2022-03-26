const express = require('express');
const router = express.Router();

const statesController = require('../controller/state');
const countryController = require('../controller/country');
const currencyController = require('../controller/currency');
const cityController = require('../controller/city');
const unitController = require('../controller/unit');

router.get('/Totalstate', statesController.TotalStates);
router.post('/deleteState', statesController.deleteState);
router.post('/state', statesController.state);
router.post('/showstate', statesController.showstate);
router.post('/EditState', statesController.EditState);

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

router.get('/TotalUnit',unitController.TotalUnit)
router.post('/Unit',unitController.Unit)
router.post('/Showunit',unitController.showunit)
router.post('/UpdateUnit',unitController.UpdateUnit)
router.post('/deleteUnit',unitController.deleteUnit)


module.exports = router;