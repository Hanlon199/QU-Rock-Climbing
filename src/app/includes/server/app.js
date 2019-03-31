const express = require('express');
const bodyParser = require('body-parser');
const userService = require('./services/userService')
const eventService = require('./services/eventService')
const app = express();
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:false}));
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

////////////////////////////////////////////////
// Users
////////////////////////////////////////////////
app.post("/api/addUser", (req,res)=>{
	let userServiceObj = new userService(req,res);
	userServiceObj.addUser();
});

app.post("/api/removeUser", (req,res)=>{
	let userServiceObj = new userService(req,res);
	userServiceObj.removeUser();
});

app.post("/api/editUser", (req,res)=>{
	let userServiceObj = new userService(req,res);
	userServiceObj.editUser();
});

app.get("/api/getUser", (req,res)=>{
	let userServiceObj = new userService(req,res);
	userServiceObj.getUser();
});

////////////////////////////////////////////////
// Events
////////////////////////////////////////////////
app.post("/api/addEvent", (req,res)=>{
	let eventServiceObj = new eventService(req,res);
	eventServiceObj.addEvent();
});

app.post("/api/removeEvent", (req,res)=>{
	let eventServiceObj = new eventService(req,res);
	eventServiceObj.removeEvent();
});

app.post("/api/editEvent", (req,res)=>{
	let eventServiceObj = new eventService(req,res);
	eventServiceObj.editEvent();
});

app.get("/api/getEvent", (req,res)=>{
	let eventServiceObj = new eventService(req,res);
	eventServiceObj.getEvent();
});

////////////////////////////////////////////////
// News
////////////////////////////////////////////////

app.listen(3000, ()=>{
	console.log('Test app listening on port 3000');
})