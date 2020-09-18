const Customer = require("../models/customer")
const { errorHandler } = require("../helpers/dbErrorHandler")
const _ = require('lodash')

exports.create = (req, res) => {
    const customer = new Customer(req.body)
    customer.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data })
    })
}

exports.update = (req, res) => {
    const customer = req.customer;
    if(req.body.customerName) {
        customer.customerName = req.body.customerName;
    }
    if(req.body.shortName) {
        customer.shortName = req.body.shortName;
    }
    if(req.body.customerCode) {
        customer.customerCode = req.body.customerCode;
    }
    if(req.body.customerStatus) {
        customer.customerStatus = req.body.customerStatus;
    }
    if(req.body.customerStatus) {
        customer.customerStatus = req.body.customerStatus;
    }
    if(req.body.companyResource) {
        customer.companyResource = req.body.companyResource;
    }


    customer.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.list = (req, res) => {
    Customer.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.customerById = (req, res, next, id) => {
    Customer.findById(id).exec((err, customer) => {
        if (err || !customer) {
            return res.status(400).json({
                error: 'Customer does not exist'
            });
        }
        req.customer = customer;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.customer);
};