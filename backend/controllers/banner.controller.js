var Banner = require("../models/banner.model.js");
const mongoose = require('mongoose');

module.exports.index = async function(req, res) {
    var banner = await Banner.find();
	res.status(200).json(banner)
} 
module.exports.post = async function(req, res) {
    let id = req.body.id;   
    const data = {
        bannerImg: req.body.bannerImg,
        bannerSmall: req.body.bannerSmall,
        bannerBig: req.body.bannerBig,
        bannerLink: req.body.bannerLink,
    } 
    await Banner.findByIdAndUpdate(id, data, function(error) {
        if (error) {
            console.log(error);
        }
    })
    res.status(200).send("ok"); 

} 