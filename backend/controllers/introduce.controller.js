var Introduce = require("../models/introduce.model.js");
const mongoose = require('mongoose');

module.exports.index = async function(req, res) {
    var intro = await Introduce.find();
	res.status(200).json(intro)
} 
module.exports.info = async function(req, res) {
    var id = req.params.id; 
	Introduce.findById({ _id: id }).then(function(intro) {
		res.json(intro);
	});
} 
module.exports.delete = async function(req, res) { 
    await Introduce.findByIdAndRemove(req.params.id)
    res.status(200).send("ok");
} 
module.exports.update = async function(req, res) { 
	let id = req.body.id; 
	const data = {
		introduceName: req.body.introduceName,
		introduceUrl: req.body.introduceUrl,
		introduceTitle: req.body.introduceTitle,
		introduceContent: req.body.introduceContent
	} 
	await Introduce.findByIdAndUpdate(id, data, function(error) {
		if (error) {
			console.log(error);
		}
	})
	res.status(200).send("ok");
} 
module.exports.post = async function(req, res) {   
    const data = {
        introduceName: req.body.introduceName,
		introduceUrl: req.body.introduceUrl,
		introduceTitle: req.body.introduceTitle,
		introduceContent: req.body.introduceContent
    }
	await Introduce.create(data)
    res.status(200).send("ok");
} 