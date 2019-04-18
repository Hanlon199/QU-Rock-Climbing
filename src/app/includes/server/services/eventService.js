const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost';
const ObjectID = require('mongodb').ObjectID;

class EventsService{
	constructor(req,res){
		this.req = req;
		this.res = res;
	}

	insert(event, db, callback){
		db.collection('events').insertOne({
			"name": event.name,
			"description" : event.description,
			"location" : event.location,
			"time" : event.time
		}, function(){
			callback();
		})
	}

	edit(event,db,callback){
		db.collection('events').update(
		{"_id": ObjectID(event.id)},
		{
			$set:{
				"name": event.name,
				"description" : event.description,
				"location" : event.location,
				"time" : event.time
			}
		}, function(){
			callback();
		})
	}

	remove(id, db, callback){
		db.collection('events').remove({"_id":ObjectID(id)});
	}

	//
	addEvent(){
		let self = this;
		let event = this.req.body.event;
		try{
			MongoClient.connect(url, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				self.insert(event,db,function(){
					return self.res.status(200).json({
						status:"success"
					})
				})
			});
		}
		catch(error){
			return self.status(500).json({
				status:"500",
				error:error
			});
		}
	}

	//
	getEvent(){
		let self = this;
		try{
			MongoClient.connect(url, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				let events = [];
				let cursor = db.collection('events').find();

				cursor.each((err,doc)=>{
					assert.equal(err,null);
					if (doc != null) {events.push(doc)}
					else{
						return self.res.status(200).json({
							status:"success",
							data:events
						});
					}
				});
			});
		}
		catch(error){
			return self.res.status(500).json({
				status:"error",
				error:error
			});
		}
	}


	//
	editEvent(){
		let self = this;
		let event = this.req.body.event;
		console.log("EVENT SERVICE EDIT: ",  event)
		try{
			MongoClient.connect(url, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				self.edit(event,db,function(){
					return self.res.status(200).json({
						status:"success"
					})
				})
			});
		}
		catch(error){
			return self.status(500).json({
				status:"500",
				error:error
			});
		}
	}



	//
	removeEvent(){
		let self = this;
		let id = this.req.params.id;
		try{
			MongoClient.connect(url, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				self.remove(id,db,function(){
					return self.res.status(200).json({
						status:"success"
					})
				})
			});
		}
		catch(error){
			return self.status(500).json({
				status:"500",
				error:error
			});
		}
	}
}

module.exports = EventsService;