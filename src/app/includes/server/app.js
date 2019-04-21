//INCLUDES
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({destination:'../images/eboard/'})
const bodyParser = require('body-parser');

//ROUTES
const userRoutes = require('../routes/user.route');
const eventRoutes = require('../routes/event.route');
const newsRoutes = require('../routes/news.route');
const eboardRoutes = require('../routes/eboard.route');

//APP
const app = express();
app.use(bodyParser());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/api/User",userRoutes);
app.use("/api/Event",eventRoutes);
app.use("/api/News",newsRoutes);
app.use("/api/Eboard",eboardRoutes);

/// LISTEN TO MEEEE GOOOOO
app.listen(3000, ()=>{
	console.log('Test app listening on port 3000');
})
