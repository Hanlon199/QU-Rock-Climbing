const express = require("express")
const router = express();
const eboardService = require('../server/services/eboardService');
const Eboard = require('../models/eboard.model')
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,'../images/eboard/')
	},
	filename: function(req,file,cb){
		cb(null, file.originalname);
	}
});

const fileFilter = (req,file,cb)=>{
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null,true)
	}else{
		cb(null,false)
	}
}

const upload = multer({
	storage:storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

////////////////////////////////////////////////
// Eboard
////////////////////////////////////////////////
router.put("", upload.single('eboardImage'), (req, res,next) => {
	// console.log("FILE: " , req.file)
	// console.log("DESC: ", req.body)
	const eboard = new Eboard({
		id: new mongoose.Types.ObjectId(),
		eboardImage: req.file.path,
		description: req.body.description,
		position: req.body.position,
		name: req.body.name,
	})
	let eboardServiceObj = new eboardService(req, res);
	eboardServiceObj.addEboard();
	// eboard.save()
	// 	.then(res=>{
	// 		console.log(res);
	// 		res.status(201).json({
	// 			message:"Created Eboard Image Succesfully!",
	// 			createdImage:{
	// 				description: res.description,
	// 				_id: res._id,
	// 				request:{
	// 					type:'GET',
	// 					url: "http://localhost:3000/api/eboard/" + result._id
	// 				}
	// 			}
	// 		})
	// 	})
	// 	.catch(err => {
	//       console.log(err);
	//       res.status(500).json({
	//         error: err
	//       });
	//     });
	// let eboardServiceObj = new eboardService(req, res);
	// eboardServiceObj.editEboard();
});

router.delete("/:id", (req, res) => {
	let eboardServiceObj = new eboardService(req, res);
	eboardServiceObj.removeEboard();
});

router.post("", (req, res) => {
	let eboardServiceObj = new eboardService(req, res);
	eboardServiceObj.addEboard();
});

router.get("", (req, res) => {
	let eboardServiceObj = new eboardService(req, res);
	eboardServiceObj.getEboard();
});

module.exports = router;