const express = require("express");
const router = express.Router();
const eventService = require('../server/services/eventService')
const mongoose = require("mongoose");

////////////////////////////////////////////////
// Events
////////////////////////////////////////////////
router.put("", (req,res)=>{
	let eventServiceObj = new eventService(req,res);
	eventServiceObj.addEvent();
});

router.delete("/:id", (req,res)=>{
	let eventServiceObj = new eventService(req,res);
	eventServiceObj.removeEvent();
});

router.post("", (req,res)=>{
	let eventServiceObj = new eventService(req,res);
	eventServiceObj.editEvent();
});

router.get("", (req,res)=>{
	let eventServiceObj = new eventService(req,res);
	eventServiceObj.getEvent();
});

module.exports = router;