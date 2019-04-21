const express = require("express");
const router = express.Router();
const userService = require('../server/services/userService')
const mongoose = require("mongoose");

////////////////////////////////////////////////
// Users
////////////////////////////////////////////////
router.put("", (req,res)=>{
	let userServiceObj = new userService(req,res);
	userServiceObj.addUser();
});

router.delete("/:id", (req,res)=>{
	let userServiceObj = new userService(req,res);
	userServiceObj.removeUser();
});

router.post("", (req,res)=>{
	console.log("EDIT")

	let userServiceObj = new userService(req,res);
	userServiceObj.editUser();
});

router.get("", (req,res)=>{
	let userServiceObj = new userService(req,res);
	userServiceObj.getUser();
});

module.exports = router;