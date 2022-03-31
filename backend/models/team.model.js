const mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({  
    teamMemberName: String, 
    teamMemberTitle: String,
    teamMemberFacebook: String,
    teamMemberInsta: String,
    teamMemberGmail: String,
    teamMemberAvt: String,
	},
    {
    	versionKey: false
    }
)

var Team = mongoose.model('Team', teamSchema, 'Team');

module.exports = Team;