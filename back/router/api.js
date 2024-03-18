const express = require('express')
const {
    addBusinessCategory,
    editBusinessCategory,
    deleteBusinessCategory,
    getBusinessCategory,
    addExpenseCategory,
    getExpenseCategory,
    editExpenseCategory,
    deleteExpenseCategory
} = require('../controller/setup')

const {
    addIncomeData, editIncomeData, deleteIncomeData, getIncomeData, getAllIncomeData
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

// process incomes
router.post('/incomeData', addIncomeData)
router.put('/incomeData', editIncomeData)
router.delete('/incomeData', deleteIncomeData)
router.get('/allIncomeData', getAllIncomeData)
router.get('/incomeData', getIncomeData)

// process expense
router.post('/businessCategory', addBusinessCategory)
router.put('/businessCategory', editBusinessCategory)
router.delete('/businessCategory', deleteBusinessCategory)
router.get('/businessCategory', getBusinessCategory)

module.exports = router