var Quote = require("../models/quote.model.js");
const mongoose = require('mongoose');

module.exports.index = async function(req, res) {
    var quote = await Quote.find();
	res.status(200).json(quote)
} 
module.exports.info = async function(req, res) {
    var id = req.params.id; 
	Quote.findById({ _id: id }).then(function(quote) {
		res.json(quote);
	});
} 
module.exports.delete = async function(req, res) { 
    await Quote.findByIdAndRemove(req.params.id)
    res.status(200).send("ok");
} 
module.exports.post = async function(req, res) {   
    const data = {
        quoteAvt: req.body.quoteAvt,
        quoteName: req.body.quoteName,
        quoteTitle: req.body.quoteTitle, 
        quoteContent: req.body.quoteContent, 
    }
	await Quote.create(data)
    res.status(200).send("ok");
}  
module.exports.update = async function(req, res) { 
    let id = req.body.id;    
    const data = {
        quoteAvt: req.body.quoteAvt,
        quoteName: req.body.quoteName,
        quoteTitle: req.body.quoteTitle, 
        quoteContent: req.body.quoteContent
    }
    await Quote.findByIdAndUpdate(id, data, function(error) {
        if (error) {
            console.log(error);
        }
    })
    res.status(200).send("ok"); 
} 