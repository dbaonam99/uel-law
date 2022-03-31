var Contact = require("../models/contact.model.js");
const mongoose = require('mongoose');

module.exports.index = async function(req, res) {
    var contact = await Contact.find();
	res.status(200).json(contact)
} 
module.exports.info = async function(req, res) {
    var id = req.params.id; 
	Contact.findById({ _id: id }).then(function(contact) {
		res.json(contact);
	});
} 
module.exports.delete = async function(req, res) { 
    await Contact.findByIdAndRemove(req.params.id)
    res.status(200).send("ok");
} 
module.exports.post = async function(req, res) {   
    const data = {
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        contactContent: req.body.contactContent,  
        contactStatus: false
    }
	await Contact.create(data)
    res.status(200).send("ok");
} 
module.exports.update = async function(req, res) { 
    let id = req.body.id; 
	const data = {
        contactEmail: req.body.contactEmail,
        contactName: req.body.contactName,
        contactContent: req.body.contactContent,
        contactStatus: req.body.contactStatus, 
	}
	await Contact.findByIdAndUpdate(id, data, function(error) {
		if (error) {
			console.log(error);
		}
	})
	res.status(200).send("ok");
} 