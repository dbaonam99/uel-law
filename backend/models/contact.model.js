const mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({ 
    contactEmail: String, 
    contactName: String,
    contactContent: String,
    contactStatus: String,
	},
    {
    	versionKey: false
    }
)

var Contact = mongoose.model('Contact', contactSchema, 'Contact');

module.exports = Contact;