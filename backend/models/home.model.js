const mongoose = require('mongoose');

var homeSchema = new mongoose.Schema({ 
    homeAboutUsImg: String, 
    homeAboutUsTitle: String,
    homeAboutUsContent: String,
    homeSponsor: String,
    homeTeamMemberTitle: String,
    homeTeamMemberText: String,  
    homeBlog: String,
    homeContactTitle: String,
    homeContactAddress: String,
    homeContactEmail: String,
    homeContactPhone: String,
    emailUser: String,
    emailPassword: String,
    emailSubject: String,
    emailText: String,
    emailSubjectNews: String,
    emailTextNews: String,
	},
    {
    	versionKey: false
    }
)

var Home = mongoose.model('Home', homeSchema, 'Home');

module.exports = Home;