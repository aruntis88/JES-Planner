const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const resourceSchema = new mongoose.Schema(
    {
        // user: {
        //     type: ObjectId,
        //     ref: "Company"
        // },
        company: {
            type: String,
            required: true
        },
        resourceName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        category: {
            type: ObjectId,
            ref: "Customer"
        },
        resourceCode: {
        	type: String,
            trim: true,
            required: true,
            maxlength: 10,
            unique: true
        },
        designation: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String
        },
        role: {
            type: String,
            enum: ["Super Admin", "Moderator"] 
        },
        phone: {
            type: String
        },
        passcode: {
            type: String
        },
        resourceStatus: {
        	type: Boolean
        },
        photo: {
            data: Buffer,
            contentType: String
        },
    }
);

module.exports = mongoose.model("Resource", resourceSchema);
