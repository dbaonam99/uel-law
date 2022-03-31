const mongoose = require('mongoose');

var archiveSchema = new mongoose.Schema({ 
    archiveName: String, 
    archiveLink: String,
    archiveDate: String,
    archiveView: Number,
	},
    {
    	versionKey: false
    }
)

var Archive = mongoose.model('Archive', archiveSchema, 'Archive');

module.exports = Archive;