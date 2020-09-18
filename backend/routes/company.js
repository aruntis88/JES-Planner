 const express = require('express')
const router = express.Router()

const { create, list, read, companyById } = require("../controllers/company")

router.post("/company/create", create)
router.get('/companies', list)
router.get('/company/:companyId', read);

router.param('companyId', companyById);

module.exports = router