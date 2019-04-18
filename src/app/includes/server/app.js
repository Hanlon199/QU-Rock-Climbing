const express = require('express');
const bodyParser = require('body-parser');
const userService = require('./services/userService')
const eventService = require('./services/eventService')
const newsService = require('./services/newsService');
const eboardService = require('./services/eboardService');
const authService = require('./services/authService')
const app = express();
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
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
// Auth
////////////////////////////////////////////////
app.get("/api/Auth", (req, res) => {
	let authServiceObj = new authService(req, res);
	authServiceObj.getUsername();
});

app.post("/api/Auth/add", (req, res) => {
	let authServiceObj = new authService(req, res);
	authServiceObj.addUsername();
});

app.post("/api/Auth/check", (req, res) => {
	let authServiceObj = new authService(req, res);
	authServiceObj.compareUsername();
});

////////////////////////////////////////////////
// Users
////////////////////////////////////////////////
app.post("/api/User", (req, res) => {
	let userServiceObj = new userService(req, res);
	userServiceObj.addUser();
});

app.delete("/api/User/:id", (req, res) => {
	let userServiceObj = new userService(req, res);
	userServiceObj.removeUser();
});

app.put("/api/User", (req, res) => {
	let userServiceObj = new userService(req, res);
	userServiceObj.editUser();
});

app.get("/api/User", (req, res) => {
	let userServiceObj = new userService(req, res);
	userServiceObj.getUser();
});

////////////////////////////////////////////////
// Events
////////////////////////////////////////////////
app.put("/api/Event", (req, res) => {
	let eventServiceObj = new eventService(req, res);
	eventServiceObj.addEvent();
});

app.delete("/api/Event/:id", (req, res) => {
	let eventServiceObj = new eventService(req, res);
	eventServiceObj.removeEvent();
});

app.post("/api/Event", (req, res) => {
	let eventServiceObj = new eventService(req, res);
	eventServiceObj.editEvent();
});

app.get("/api/Event", (req, res) => {
	let eventServiceObj = new eventService(req, res);
	eventServiceObj.getEvent();
});

////////////////////////////////////////////////
// News
////////////////////////////////////////////////
app.put("/api/News", (req, res) => {
	let newsServiceObj = new newsService(req, res);
	newsServiceObj.editNews();
});

app.delete("/api/News/:id", (req, res) => {
	let newsServiceObj = new newsService(req, res);
	newsServiceObj.removeNews();
});

app.post("/api/News", (req, res) => {
	let newsServiceObj = new newsService(req, res);
	newsServiceObj.addNews();
});

app.get("/api/News", (req, res) => {
	let newsServiceObj = new newsService(req, res);
	newsServiceObj.getNews();
});

////////////////////////////////////////////////
// Eboard
////////////////////////////////////////////////
app.put("/api/Eboard", (req, res) => {
	let eboardServiceObj = new eboardService(req, res);
	eboardServiceObj.editEboard();
});

app.delete('/api/Eboard/:id', (req, res) => {
	let eboardServiceObj = new eboardService(req, res);
	eboardServiceObj.removeEboard();
});

app.post('/api/Eboard', (req, res) => {
	let eboardServiceObj = new eboardService(req, res);
	eboardServiceObj.addEboard();
});

app.get('/api/Eboard', (req, res) => {
	let eboardServiceObj = new eboardService(req, res);
	eboardServiceObj.getEboard();
});

/// LISTEN TO MEEEE GOOOOO
app.listen(3000, ()=>{
	console.log('Test app listening on port 3000');
})
