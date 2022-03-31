const mongoose = require('mongoose');

var introduceSchema = new mongoose.Schema({ 
    introduceName: String,
    introduceUrl: String,
    introduceTitle: String,
    introduceContent: Array,
	},
    {
    	versionKey: false
    }
)

var Introduce = mongoose.model('Introduce', introduceSchema, 'Introduce');

module.exports = Introduce;