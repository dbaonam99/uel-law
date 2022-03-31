var Home = require("../models/home.model.js");
const mongoose = require('mongoose');

module.exports.index = async function(req, res) {
    var home = await Home.find();
	res.status(200).json(home)
} 
module.exports.updateTitle = async function(req, res) {
    let id = req.body.id; 
    const data = {
        homeSponsor: req.body.homeSponsor,
        homeTeamMemberTitle: req.body.homeTeamMemberTitle,
        homeTeamMemberText: req.body.homeTeamMemberText, 
        homeBlog: req.body.homeBlog,
        homeContactTitle: req.body.homeContactTitle,
        homeContactAddress: req.body.homeContactAddress,
        homeContactEmail: req.body.homeContactEmail,
        homeContactPhone: req.body.homeContactPhone
    }
    await Home.findByIdAndUpdate(id, data, function(error) {
        if (error) {
            console.log(error);
        }
    })
    res.status(200).send("ok");
} 
module.exports.updateEmail = async function(req, res) { 
    let id = req.params.id;   
	const data = {
        emailUser: req.body.emailUser,
        emailPassword: req.body.emailPassword,
        emailSubject: req.body.emailSubject,
        emailText: req.body.emailText,
        emailSubjectNews: req.body.emailSubjectNews,
        emailTextNews: req.body.emailTextNews,
	} 
	await Home.findByIdAndUpdate(id, data, function(error) {
		if (error) {
			console.log(error);
		}
	})
	res.status(200).send("ok");
} 
module.exports.update = async function(req, res) {
    let id = req.body.id;   
    const data = {
        homeAboutUsImg: req.body.homeAboutUsImg,
        homeAboutUsTitle: req.body.homeAboutUsTitle,
        homeAboutUsContent: req.body.homeAboutUsContent, 
    } 
    await Home.findByIdAndUpdate(id, data, function(error) {
        if (error) {
            console.log(error);
        }
    })
    res.status(200).send("ok"); 
} 