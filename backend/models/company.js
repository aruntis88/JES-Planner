const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        shortName: {
        	type: String,
            trim: true,
            required: true,
            maxlength: 4,
            unique: true
        },
        companyCode: {
        	type: String,
            trim: true,
            required: true,
            maxlength: 10,
            unique: true
        },
        companyStatus: {
        	type: Boolean
        } 
    }
);

module.exports = mongoose.model("Company", companySchema);
