const express = require("express");
const router = express.Router();
const ApplicantService = require('../server/services/applicantService')
const mongoose = require("mongoose");

////////////////////////////////////////////////
// Applicant
////////////////////////////////////////////////
router.put("", (req,res)=>{
	let applicantServiceObj = new ApplicantService(req,res);
	applicantServiceObj.addApplicant();
});

router.delete("/:id", (req,res)=>{
	let applicantServiceObj = new ApplicantService(req,res);
	applicantServiceObj.removeApplicant();
});

router.get("", (req,res)=>{
	let applicantServiceObj = new ApplicantService(req,res);
	applicantServiceObj.getApplicants();
});

module.exports = router;