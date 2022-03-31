const mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({ 
    newsTitle: String, 
    newsDate: String,
    newsBanner: String,
    newsCate: String,
    newsUrl: String,
    newsContent: Array,
	},
    {
    	versionKey: false
    }
)

var News = mongoose.model('News', newsSchema, 'News');

module.exports = News;