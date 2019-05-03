const express = require("express");
const router = express.Router();
const newsService = require('../server/services/newsService');
const mongoose = require("mongoose");

////////////////////////////////////////////////
// News
////////////////////////////////////////////////
router.post("", (req, res) => {
	let newsServiceObj = new newsService(req, res);
	newsServiceObj.editNews();
});

router.delete("/:id", (req, res) => {
	let newsServiceObj = new newsService(req, res);
	newsServiceObj.removeNews();
});

router.put("", (req, res) => {
	let newsServiceObj = new newsService(req, res);
	newsServiceObj.addNews();
});

router.get("", (req, res) => {
	let newsServiceObj = new newsService(req, res);
	newsServiceObj.getNews();
});

module.exports = router;