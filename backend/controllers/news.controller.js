var News = require("../models/news.model.js");
const mongoose = require('mongoose');
var Email = require("../models/email.model");
var Home = require("../models/home.model");

var nodemailer = require('nodemailer');  

module.exports.index = async function(req, res) {
    var news = await News.find();
	res.status(200).json(news)
} 
module.exports.info = async function(req, res) {
    var id = req.params.id.split("-")[req.params.id.split("-").length - 1];  
	News.findById({ _id: id }).then(function(quote) {
		res.json(quote);
	});
} 
module.exports.delete = async function(req, res) { 
    await News.findByIdAndRemove(req.params.id)
    res.status(200).send("ok");
} 
module.exports.content = async function(req, res) {  
    const id = req.body.id
    const data = { 
        newsContent: req.body.newsContent
    } 
    await News.findByIdAndUpdate(id, data, function(error) {
        if (error) {
            console.log(error);
        }
    })
    res.status(200).send("ok"); 
}
module.exports.post = async function(req, res) {  
    var home = await Home.find(); 
    const userEmail = home[0].emailUser;
    const userPassword = home[0].emailPassword;
    const userSubject = home[0].emailSubjectNews;
    const userText = home[0].emailTextNews;
    
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
    const data = {
        newsBanner: req.body.newsBanner,
        newsTitle: req.body.newsTitle,
        newsDate: req.body.newsDate, 
        newsCate: req.body.newsCate, 
        newsUrl: req.body.newsUrl,
        newsDate: new Date()
    }  
    try {
        const news = new News(data);
        let id = "" 
        await news.save().then((res)=>{ 
            id = res._id
        })  
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
    
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            })
        }

        res.status(200).send(id);  
    } catch (err) { 
        res.status(500).send(err);
    }
} 
module.exports.update = async function(req, res) { 
    let id = req.body.id; 
    const data = {
        newsBanner: req.body.newsBanner,
        newsTitle: req.body.newsTitle, 
        newsCate: req.body.newsCate,
        newsUrl: req.body.newsUrl,
    }
    console.log(data)
    await News.findByIdAndUpdate(id, data, function(error) {
        if (error) {
            console.log(error);
        }
    })
    res.status(200).send("ok"); 
} 