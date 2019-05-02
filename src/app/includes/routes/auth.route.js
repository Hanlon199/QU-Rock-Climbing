const express = require("express");
const router = express.Router();
const authService = require('../server/services/authService')
const mongoose = require("mongoose");

////////////////////////////////////////////////
// Auth
////////////////////////////////////////////////
router.get("/pending", (req, res) => {
	let authServiceObj = new authService(req, res);
	authServiceObj.getPendingUsername();
});

router.get("/all", (req, res) => {
	let authServiceObj = new authService(req, res);
	authServiceObj.getAllUsername();
});

router.post("/add", (req, res) => {
	let authServiceObj = new authService(req, res);
	authServiceObj.addUsername();
});

router.post("/check", (req, res) => {
	let authServiceObj = new authService(req, res);
	authServiceObj.compareUsername();
});

router.put("", (req, res) => {
	let authServiceObj = new authService(req, res);
	authServiceObj.updateUser();
});

router.delete("/:id", (req, res) => {
	let authServiceObj = new authService(req, res);
	authServiceObj.deleteUser();
});

module.exports = router;