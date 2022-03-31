const mongoose = require('mongoose');

var librarySchema = new mongoose.Schema({ 
    libraryGroup: String,
    libraryCate: String,
    libraryTitle: String,
    libraryUrl: String,
    libraryDate: String,
    libraryContent: Array,
	},
    {
    	versionKey: false
    }
)

var Library = mongoose.model('Library', librarySchema, 'Library');

module.exports = Library;