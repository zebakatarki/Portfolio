const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    emailsub:{
        type:String,
        required:true
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Validates 10 digits
            },
            message: props => `${props.value} is not a valid phone number! Must be 10 digits.`
        }
    },

    message:{
        type:String,
        required:true
    },
    time:{
        type:Date
    }
});

module.exports = mongoose.model('Contact',contactSchema);