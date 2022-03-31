var Team = require("../models/team.model.js");
const mongoose = require('mongoose');

module.exports.index = async function(req, res) {
    var team = await Team.find();
	res.status(200).json(team)
} 
module.exports.info = async function(req, res) {
    var id = req.params.id; 
	Team.findById({ _id: id }).then(function(quote) {
		res.json(quote);
	});
} 
module.exports.delete = async function(req, res) { 
    await Team.findByIdAndRemove(req.params.id)
    res.status(200).send("ok");
} 
module.exports.post = async function(req, res) {  
    const data = {
        teamMemberAvt: req.body.teamMemberAvt,
        teamMemberName: req.body.teamMemberName,
        teamMemberTitle: req.body.teamMemberTitle, 
        teamMemberFacebook: req.body.teamMemberFacebook,
        teamMemberInsta: req.body.teamMemberInsta, 
        teamMemberGmail: req.body.teamMemberGmail, 
    } 
	await Team.create(data)
    res.status(200).send("ok");
} 
module.exports.update = async function(req, res) { 
    let id = req.body.id;   
    const data = {
        teamMemberAvt: req.body.teamMemberAvt,
        teamMemberName: req.body.teamMemberName,
        teamMemberTitle: req.body.teamMemberTitle, 
        teamMemberFacebook: req.body.teamMemberFacebook,
        teamMemberInsta: req.body.teamMemberInsta, 
        teamMemberGmail: req.body.teamMemberGmail, 
    } 
    await Team.findByIdAndUpdate(id, data, function(error) {
        if (error) {
            console.log(error);
        }
    })
    res.status(200).send("ok"); 
} 