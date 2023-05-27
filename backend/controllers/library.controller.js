var Library = require("../models/library.model.js");
const mongoose = require('mongoose');
var Email = require("../models/email.model");
var Home = require("../models/home.model");
var nodemailer = require('nodemailer'); 

module.exports.index = async function(req, res) {
    var intro = await Library.find();
	res.status(200).json(intro)
} 
module.exports.info = async function(req, res) {
	var id = req.params.id.split("-")[req.params.id.split("-").length - 1];   
	Library.findById({ _id: id }).then(function(quote) {
		res.json(quote);
	});
} 
module.exports.delete = async function(req, res) { 
    await Library.findByIdAndRemove(req.params.id)
    res.status(200).send("ok");
} 
module.exports.update = async function(req, res) { 
	let id = req.body.id;  
	const data = {
        libraryGroup: req.body.libraryGroup,
		libraryCate: req.body.libraryCate,
		libraryTitle: req.body.libraryTitle, 
		libraryContent: req.body.libraryContent,
		libraryUrl: req.body.libraryUrl 
	} 
	await Library.findByIdAndUpdate(id, data, function(error) {
		if (error) {
			console.log(error);
		}
	})
	res.status(200).send("ok");
} 
module.exports.post = async function(req, res) {    
    const data = {
        libraryGroup: req.body.libraryGroup,
		libraryCate: req.body.libraryCate,
		libraryTitle: req.body.libraryTitle,
		libraryDate: req.body.libraryDate,
		libraryContent: req.body.libraryContent,
		libraryUrl: req.body.libraryUrl 
	}
	var home = await Home.find(); 
    const userEmail = home[0].emailUser;
    const userPassword = home[0].emailPassword;
    const userSubject = home[0].emailSubjectNews;
    const userText = home[0].emailTextNews;
    
    if (userEmail && userPassword) {
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: userEmail,
				pass: userPassword
			}
		})
		transporter.verify(function(error, success) {
			if (error) {
				console.log(error);
			} else { 
			}
		});
	}

	var emailList = await Email.find()
	for (let i in emailList) {
		Email.findOne({ _id: emailList[i]._id })
			.updateOne({$push: { 
				sendEmail: {
					emailId: new mongoose.mongo.ObjectId(),
					isSeen: false
				}
			}})
		.exec()
		var emailInfo = await Email.findById(emailList[i]._id)
		var mailOptions = {
			from: userEmail,
			to: emailList[i].subscriberEmail,
			subject: userSubject,
			html: `${userText}` +
			`<img src="https://uel-law.herokuapp.com/email/${emailList[i]._id}/${emailInfo.sendEmail[emailInfo.sendEmail.length - 1].emailId}" alt="" width="1px" height="1px"></div>`
		}

		if (userEmail && userPassword) {
			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
				console.log(error);
				} else {
				console.log('Email sent: ' + info.response);
				}
			})
		}
	}
	await Library.create(data)
    res.status(200).send("ok");
} 