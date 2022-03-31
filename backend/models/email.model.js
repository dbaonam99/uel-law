const mongoose = require('mongoose');

var emailSchema = new mongoose.Schema({
	subscriberDate: String,
	subscriberEmail: String,
	sendEmail: Array,
	sendEmail: [ 
        {
            emailId: mongoose.Schema.ObjectId,
            isSeen: Boolean
        }
    ]
	},
    {
    	versionKey: false
    }
)

var Email = mongoose.model('Email', emailSchema, 'Email');

module.exports = Email;