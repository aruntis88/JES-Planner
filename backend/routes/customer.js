 const express = require('express')
const router = express.Router()

const { create, list, read, update, customerById } = require("../controllers/customer")

router.post("/customer/create", create)
router.get('/customers', list)
router.get('/customer/:customerId', read);
router.put("/customer/:customerId", update)

router.param('customerId', customerById);

module.exports = router