//INCLUDES
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({destination:'../images/eboard/'})
const bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var port = '8080';
// app.use((req,res,next)=>{
// 	res.setHeader('Access-Control-Allow-Origin', "*");
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// 	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// 	res.setHeader('Access-Control-Allow-Credentials', true);
// });
// var schema = mongoose.Schema;
// var testSchema = new schema({
// 	name: {type:String},
// 	address: {type:String}
// }, {versionKey:false});
// var model = mongoose.model('users', testSchema, 'users');

//ROUTES
const userRoutes = require('../routes/user.route');
const eventRoutes = require('../routes/event.route');
const newsRoutes = require('../routes/news.route');
const eboardRoutes = require('../routes/eboard.route');
const applicantRoutes = require('../routes/applicant.route');
const authRoutes = require('../routes/auth.route')

//APP
const app = express();
app.use(bodyParser());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/api/Applicant",applicantRoutes);
app.use("/api/User",userRoutes);
app.use("/api/Event",eventRoutes);
app.use("/api/News",newsRoutes);
app.use("/api/Eboard",eboardRoutes);
app.use("/api/Auth",authRoutes);

/// LISTEN TO MEEEE GOOOOO
app.listen(3000, ()=>{
	console.log('Roger that Raggy ristening on port 3000');
})
