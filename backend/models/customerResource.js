const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;


const customerResourceSchema = new mongoose.Schema(
    {
        customer: {
            type: String,
            required: true
        },
        customerResourceName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        email: {
            type: String
        },
        role: {
            type: String,
            enum: ["Admin", "Engineer"] 
        },
        phone: {
            type: String
        },
        passcode: {
            type: String
        },
        customerResourceStatus: {
        	type: Boolean
        },
        photo: {
            data: Buffer,
            contentType: String
        },
    }
);

module.exports = mongoose.model("CustomerResource", customerResourceSchema);
