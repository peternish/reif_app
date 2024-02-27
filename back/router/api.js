const express = require('express')
const { addBusinessCategory, getBusinessCategory, editBusinessCategory, deleteBusinessCategory } = require('../controller/setup')
const router = express.Router()

router.post('/businessCategory', addBusinessCategory)
router.put('/businessCategory', editBusinessCategory)
router.delete('/businessCategory', deleteBusinessCategory)
router.get('/businessCategory', getBusinessCategory)

module.exports = router