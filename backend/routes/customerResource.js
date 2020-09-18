 const express = require('express')
const router = express.Router()

const { create, customerResourceById, read, remove, update, list, photo } = require("../controllers/customerResource")

router.get('/customerResource/:customerResourceId', read)
router.post("/customerResource/create", create)
router.delete("/customerResource/:customerResourceId", remove)
router.put("/customerResource/:customerResourceId", update)
router.get('/customerResources', list)
router.get('/customerResource/photo/:customerResourceId', photo)


router.param("customerResourceId", customerResourceById)

module.exports = router