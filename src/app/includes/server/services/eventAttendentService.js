const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost';
const ObjectID = require('mongodb').ObjectID;

class EventAttendentService{
	constructor(req,res){
		this.req = req;
		this.res = res;
	}

	insert(user, db, callback){
		db.collection('eventAttendent').insertOne({
			"_eventId": user._eventId,
			"name": user.name,
			"member" : user.member,
			"belayCert" : user.belayCert,
			"driver" : user.driver
		}, function(){
			callback();
		})
	}

	remove(id, db, callback){
		db.collection('eventAttendent').deleteOne({"_id":ObjectID(id)});
	}

	//
	addAttendents(){
		let self = this;
		let attendent = this.req.body.applicant;
		try{
			MongoClient.connect(url, {useNewUrlParser:true}, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				self.insert(attendent,db,function(){
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
	getAttendents(){
		let self = this;
		try{
			MongoClient.connect(url, {useNewUrlParser:true}, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				let attendents = [];
				let cursor = db.collection('eventAttendent').find();

				cursor.each((err,doc)=>{
					assert.equal(err,null);
					if (doc != null) {attendents.push(doc)}
					else{
						return self.res.status(200).json({
							status:"success",
							data:attendents
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
	removeAttendent(){
		let self = this;
		let id = this.req.params.id;
		try{
			MongoClient.connect(url, {useNewUrlParser:true}, (err,client)=>{
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

module.exports = EventAttendentService;