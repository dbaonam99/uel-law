const mongoose = require('mongoose');

var quoteSchema = new mongoose.Schema({ 
    quoteAvt: String, 
    quoteContent: String,
    quoteName: String,
    quoteTitle: String,
	},
    {
    	versionKey: false
    }
)

var Quote = mongoose.model('Quote', quoteSchema, 'Quote');

module.exports = Quote;