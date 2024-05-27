const express = require('express')
const {
    addBusinessCategory,
    editBusinessCategory,
    deleteBusinessCategory,
    getBusinessCategory,
    addExpenseCategory,
    getExpenseCategory,
    editExpenseCategory,
    deleteExpenseCategory,
    getAllSettingData,
    getSettingData,
    addSettingData,
    editSettingData,
    deleteSettingData,
    getVendor,
    addVendorCategory,
    editVendorCategory,
    deleteVendorCategory,
    addDescriptionCategory,
    editDescriptionCategory,
    deleteDescriptionCategory,
    getDescriptionCategory,
    addPMethodCategory,
    editPMethodCategory,
    deletePMethodCategory,
    getPMethodCategory,
    addPAccountCategory,
    editPAccountCategory,
    deletePAccountCategory,
    getPAccountCategory,
    getCustomer,
    addCustomerCategory,
    editCustomerCategory,
    deleteCustomerCategory,
} = require('../controller/setup')

const {
    addIncomeData, editIncomeData, deleteIncomeData, getIncomeData, getAllIncomeData,
    addExpenseData, editExpenseData, deleteExpenseData, getExpenseData, getAllExpenseData,
    uploadInvoiceFile,
    addConfig, addSimiliarConfig,
    addPrpoertyFromProcess, addIncomeCategoryFromProcess,
    addBusinessCategoryFromProcess, addExpenseCategoryFromProcess,
    addCustomerCategoryFromProcess, addVendorCategoryFromProcess, addDescriptionCategoryFromProcess, addPMethodCategoryFromProcess,addPAccountCategoryFromProcess,
    getFileList,getAllCategories
} = require('../controller/process')

const router = express.Router()

// set up business categories
router.post('/businessCategory', addBusinessCategory)
router.put('/businessCategory', editBusinessCategory)
router.delete('/businessCategory', deleteBusinessCategory)
router.get('/businessCategory', getBusinessCategory)

// set up expenses
router.post('/expenseCategory', addExpenseCategory)
router.put('/expenseCategory', editExpenseCategory)
router.delete('/expenseCategory', deleteExpenseCategory)
router.get('/expenseCategory', getExpenseCategory)

//get all setting data
router.get('/allSettingData', getAllSettingData)
router.get('/settingData', getSettingData)
router.post('/settingData', addSettingData)
router.put('/settingData', editSettingData)
router.delete('/settingData', deleteSettingData)

// process incomes
router.post('/incomeData', addIncomeData)
router.put('/incomeData', editIncomeData)
router.delete('/incomeData', deleteIncomeData)
router.get('/allIncomeData', getAllIncomeData)
router.get('/incomeData', getIncomeData)

// process expense
router.post('/expenseData', addExpenseData)
router.put('/expenseData', editExpenseData)
router.delete('/expenseData', deleteExpenseData)
router.get('/allExpenseData', getAllExpenseData)
router.get('/expenseData', getExpenseData)

//process Customer/Properties
router.get('/customerCategory', getCustomer)
router.post('/customerCategory', addCustomerCategory)
router.put('/customerCategory', editCustomerCategory)
router.delete('/customerCategory', deleteCustomerCategory)

//process Vendor/Worker
router.get('/getVendor', getVendor)
router.post('/vendorCategory', addVendorCategory)
router.put('/vendorCategory', editVendorCategory)
router.delete('/vendorCategory', deleteVendorCategory)

// process Description
router.post('/descriptionCategory', addDescriptionCategory)
router.put('/descriptionCategory', editDescriptionCategory)
router.delete('/descriptionCategory', deleteDescriptionCategory)
router.get('/descriptionCategory', getDescriptionCategory)

// process PaymentMethod
router.post('/pMethodCategory', addPMethodCategory)
router.put('/pMethodCategory', editPMethodCategory)
router.delete('/pMethodCategory', deletePMethodCategory)
router.get('/pMethodCategory', getPMethodCategory)

// process PayFromAccount
router.post('/pAccountCategory', addPAccountCategory)
router.put('/pAccountCategory', editPAccountCategory)
router.delete('/pAccountCategory', deletePAccountCategory)
router.get('/pAccountCategory', getPAccountCategory)


//add config
router.post('/addConfig', addConfig)
router.post('/addSimiliarConfig', addSimiliarConfig)
//invoice file upload
router.post('/uploadInvoiceFile', uploadInvoiceFile)

//add property from process
router.get('/addPropertyFromProcess', addPrpoertyFromProcess)

//add income category from process
router.get('/addIncomeCategoryFromProcess', addIncomeCategoryFromProcess)

//add business category from process
router.get('/addBusinessCategoryFromProcess', addBusinessCategoryFromProcess)

//add expense/deposit category
router.get('/addExpenseCategoryFromProcess', addExpenseCategoryFromProcess)

//add categories from process
router.get('/addCustomerCategoryFromProcess', addCustomerCategoryFromProcess)
router.get('/addVendorCategoryFromProcess', addVendorCategoryFromProcess)
router.get('/addDescriptionCategoryFromProcess', addDescriptionCategoryFromProcess)
router.get('/addPMethodCategoryFromProcess', addPMethodCategoryFromProcess)
router.get('/addPAccountCategoryFromProcess', addPAccountCategoryFromProcess)

router.post('/getFileList', getFileList),
router.get('/getAllCategories', getAllCategories)

module.exports = router