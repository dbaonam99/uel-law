const mongoose = require('mongoose');

var bannerSchema = new mongoose.Schema({ 
    bannerAtHome: Boolean,
    bannerImg: String,
    bannerSmall: String,
    bannerBig: String,
    bannerLink: String,
	},
    {
    	versionKey: false
    }
)

var Banner = mongoose.model('Banner', bannerSchema, 'Banner');

module.exports = Banner;