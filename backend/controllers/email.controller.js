var Email = require("../models/email.model");
var Home = require("../models/home.model");

var nodemailer = require('nodemailer'); 
var mongoose = require('mongoose');

module.exports.index = async function(req, res) {  
    Email.findOneAndUpdate(
        { _id: req.params.idUser, "sendEmail.emailId": req.params.idEmail},
        { 
            $set: {
                "sendEmail.$.isSeen": true
            }
        },
        function(error) {
            if (error) {
                console.log(error);
            }
        }
    );
    var emailList = await Email.find()
    res.send(emailList)
}
module.exports.list = async function(req, res) { 
    var email = await Email.find(); 
	res.json(email);
}
module.exports.info = function(req, res) {
	var id = req.params.id;
	Email.findById({ _id: id }).then(function(email) {
		res.json(email);
	});
};
module.exports.updateEmail = function(req, res) {
    var id = req.params.id;
    Email.findByIdAndUpdate(id, req.body, function(error) {
        if (error) {
            console.log(error);
        }
    })
    res.status(200).send("ok");
};

module.exports.postEmail = async function(req, res) {
    var home = await Home.find(); 
    const userEmail = home[0].emailUser;
    const userPassword = home[0].emailPassword;
    const userSubject = home[0].emailSubject;
    const userText = home[0].emailText;
    
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

    var email = req.body.subscriber;
	var emailData = await Email.findOne({ subscriberEmail: email });
	if (emailData) {
		return res.status(400).send('Email này đã được đăng ký trước đó!');
	} 
    let id = ""  
    const newEmail = new Email({ 
        subscriberEmail: email,
        subscriberDate: new Date(),
        sendEmail: [
            {
                emailId: new mongoose.mongo.ObjectId(),
                isSeen: false
            }
        ]
    });
    await newEmail.save().then((res)=>{ 
        id = res._id
    })      

    var emailInfo = await Email.findById(id)
 
    var mailOptions = {
        from: userEmail, 
        to: email,
        subject: userSubject,
        html: `<div>${userText}` + 
        `<img src="https://uel-law.herokuapp.com/email/${id}/${emailInfo.sendEmail[emailInfo.sendEmail.length - 1].emailId}" alt="" width="1px" height="1px"></div>`
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    }) 

	res.status(200).send('Đăng ký nhận tin mới thành công!');
}
module.exports.delete = async function(req, res) { 
    console.log(req.params)
    await Email.findByIdAndRemove(req.params.id)
    res.status(200).send("ok");
} 