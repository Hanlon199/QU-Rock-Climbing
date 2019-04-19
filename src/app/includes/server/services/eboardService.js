const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost';
const ObjectID = require('mongodb').ObjectID;

class EboardService{
	constructor(req,res){
		this.req = req;
		this.res = res;
	}

	insert(user, db, callback){
		db.collection('eboard').insertOne({
			"photo" : user.photo,
			"description" : user.description
		}, function(){
			callback();
		})
	}

	edit(user,db,callback){
		db.collection('eboard').update(
		{"_id": ObjectID(user.id)},
		{
			$set:{
				"photo": user.photo,
				"description":user.description
			}
		}, function(){
			callback();
		})
	}

	remove(id, db, callback){
		db.collection('eboard').deleteOne({"_id":ObjectID(id)});
	}

	//
	addEboard(){
		let self = this;
		let user = this.req.body.eboard;
		try{
			MongoClient.connect(url, {useNewUrlParser:true}, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				self.insert(user,db,function(){
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
	getEboard(){
		let self = this;
		try{
			MongoClient.connect(url, {useNewUrlParser:true}, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				let eboard = [];
				let cursor = db.collection('eboard').find();

				cursor.each((err,doc)=>{
					assert.equal(err,null);
					if (doc != null) {eboard.push(doc)}
					else{
						return self.res.status(200).json({
							status:"success",
							data:eboard
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


	
	editEboard(){
		let self = this;
		let user = this.req.body.eboard;
		try{
			MongoClient.connect(url, {useNewUrlParser:true}, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				self.edit(user,db,function(){
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
	removeEboard(){
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

module.exports = EboardService;