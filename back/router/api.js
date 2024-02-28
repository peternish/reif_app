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

module.exports = router