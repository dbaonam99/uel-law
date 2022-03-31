const mongoose = require('mongoose');

var sponsorSchema = new mongoose.Schema({ 
    sponsorImg: String, 
    sponsorName: String,
    sponsorDes: String,
    sponsorDate: String,
	},
    {
    	versionKey: false
    }
)

var Sponsor = mongoose.model('Sponsor', sponsorSchema, 'Sponsor');

module.exports = Sponsor;