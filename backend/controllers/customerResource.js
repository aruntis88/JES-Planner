const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const CustomerResource = require("../models/customerResource")
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.customerResourceById = (req, res, next, id) => {
    CustomerResource.findById(id)
        // .populate('company')
        .exec((err, customerResource) => {
            if (err || !customerResource) {
                return res.status(400).json({
                    error: 'Customer Resource not found'
                });
            }
            req.customerResource = customerResource;
            next();
        });
};

exports.create = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // check for all fields
        // const { company, name, code, designation, role, phone, passcode , status} = fields;

        // if (!company || !name || !code || !designation || !role || !phone || !passcode || !status) {
        //     return res.status(400).json({
        //         error: 'All fields are required'
        //     });
        // }

        let customerResource = new CustomerResource(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            customerResource.photo.data = fs.readFileSync(files.photo.path);
            customerResource.photo.contentType = files.photo.type;
        }

        customerResource.save((err, result) => {
            if (err) {
                // console.log('RESOURCE CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.read = (req, res) => {
    req.customerResource.photo = undefined;
    return res.json(req.customerResource);
};

exports.remove = (req, res) => {
    let customerResource = req.customerResource;
    customerResource.remove((err, deletedCustomerResource) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
        	deletedCustomerResource,
            message: 'Customer Resource deleted successfully'
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        let customerResource = req.customerResource;
        customerResource = _.extend(customerResource, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            customerResource.photo.data = fs.readFileSync(files.photo.path);
            customerResource.photo.contentType = files.photo.type;
        }

        customerResource.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.list = (req, res) => {
    

    CustomerResource.find()
        .select('-photo')
        // .populate('company')
        .exec((err, customerResource) => {
            if (err) {
                return res.status(400).json({
                    error: 'Customer Resource not found'
                });
            }
            res.json(customerResource);
        });
};

exports.photo = (req, res, next) => {
    if (req.customerResource.photo.data) {
        res.set('Content-Type', req.customerResource.photo.contentType);
        return res.send(req.customerResource.photo.data);
    }
    next();
};
