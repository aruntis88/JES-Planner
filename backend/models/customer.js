const mongoose = require("mongoose"); 

const customerSchema = new mongoose.Schema(
    {
        customerName: {
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
        customerCode: {
        	type: String,
            trim: true,
            required: true,
            maxlength: 10,
            unique: true
        },
        customerStatus: {
        	type: Boolean
        },
        companyResource: [{
            _id: {
                type: String,
                unique:true
            },
            resourceName: {
                type: String
            } 
        }]
    }
);

module.exports = mongoose.model("Customer", customerSchema);
