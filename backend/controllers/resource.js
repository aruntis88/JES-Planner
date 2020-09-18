const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Resource = require("../models/resource")
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.resourceById = (req, res, next, id) => {
    Resource.findById(id)
        // .populate('company')
        .exec((err, resource) => {
            if (err || !resource) {
                return res.status(400).json({
                    error: 'Resource not found'
                });
            }
            req.resource = resource;
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

        let resource = new Resource(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            resource.photo.data = fs.readFileSync(files.photo.path);
            resource.photo.contentType = files.photo.type;
        }

        resource.save((err, result) => {
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
    req.resource.photo = undefined;
    return res.json(req.resource);
};

exports.remove = (req, res) => {
    let resource = req.resource;
    resource.remove((err, deletedResource) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
        	deletedResource,
            message: 'Resource deleted successfully'
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

        let resource = req.resource;
        resource = _.extend(resource, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            resource.photo.data = fs.readFileSync(files.photo.path);
            resource.photo.contentType = files.photo.type;
        }

        resource.save((err, result) => {
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
    

    Resource.find()
        .select('-photo')
        // .populate('company')
        .exec((err, resource) => {
            if (err) {
                return res.status(400).json({
                    error: 'Resource not found'
                });
            }
            res.json(resource);
        });
};

exports.photo = (req, res, next) => {
    if (req.resource.photo.data) {
        res.set('Content-Type', req.resource.photo.contentType);
        return res.send(req.resource.photo.data);
    }
    next();
};
