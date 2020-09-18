 const express = require('express')
const router = express.Router()

const { create, resourceById, read, remove, update, list, photo } = require("../controllers/resource")

router.get('/resource/:resourceId', read)
router.post("/resource/create", create)
router.delete("/resource/:resourceId", remove)
router.put("/resource/:resourceId", update)
router.get('/resources', list)
router.get('/resource/photo/:resourceId', photo)


router.param("resourceId", resourceById)

module.exports = router