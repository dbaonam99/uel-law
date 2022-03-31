var Archive = require("../models/archive.model.js"); 

module.exports.index = async function(req, res) {
    var archive = await Archive.find(); 
	res.status(200).json(archive);
}
module.exports.info = async function(req, res) {
    var id = req.params.id; 
	Archive.findById({ _id: id }).then(function(archive) {
		res.json(archive);
	});
} 
module.exports.delete = async function(req, res) { 
    await Archive.findByIdAndRemove(req.params.id)
    res.status(200).send("ok");
} 
module.exports.post = async function(req, res) {   
    const data = {
        archiveName: req.body.archiveName,
        archiveLink: req.body.archiveLink,
        archiveDate: req.body.archiveDate,  
        archiveView: 0
    }
	await Archive.create(data)
    res.status(200).send("ok");
} 
module.exports.update = async function(req, res) { 
    let id = req.body.id; 
    if (req.body.archiveView === 1) {  
        Archive.findByIdAndUpdate(id, { $inc: {archiveView: 1 }},
			function (error) {
			}
		)
        res.status(200).send("ok"); 
    } else {
        console.log("archive")
        const data = { 
            archiveName: req.body.archiveName,
            archiveLink: req.body.archiveLink
        } 
        await Archive.findByIdAndUpdate(id, data, function(error) {
            if (error) {
                console.log(error);
            }
        })
        res.status(200).send("ok"); 
    }
} 