var Sponsor = require("../models/sponsor.model.js");
const mongoose = require('mongoose');

module.exports.index = async function(req, res) {
    var sponsor = await Sponsor.find();
	res.status(200).json(sponsor)
} 
module.exports.info = async function(req, res) {
    var id = req.params.id; 
	Sponsor.findById({ _id: id }).then(function(quote) {
		res.json(quote);
	});
} 
module.exports.delete = async function(req, res) { 
    await Sponsor.findByIdAndRemove(req.params.id)
    res.status(200).send("ok");
} 
module.exports.post = async function(req, res) {  
    const data = {
        sponsorImg: req.body.sponsorImg,
        sponsorName: req.body.sponsorName,
        sponsorDes: req.body.sponsorDes, 
        sponsorDate: new Date(), 
    } 
	await Sponsor.create(data)
    res.status(200).send("ok");
} 
module.exports.update = async function(req, res) { 
    let id = req.body.id;   
    const data = {
        sponsorImg: req.body.sponsorImg,
        sponsorName: req.body.sponsorName,
        sponsorDes: req.body.sponsorDes
    }
    await Sponsor.findByIdAndUpdate(id, data, function(error) {
        if (error) {
            console.log(error);
        }
    })
    res.status(200).send("ok"); 
} 