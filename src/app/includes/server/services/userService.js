const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost';
const ObjectID = require('mongodb').ObjectID;

class UserService{
	constructor(req,res){
		this.req = req;
		this.res = res;
	}

	insert(user, db, callback){
		db.collection('members').insertOne({
			"name": user.name,
			"year" : user.year,
			"belayCertified" : user.belayCertified,
			"position" : user.position,
			"isAdmin" : user.isAdmin
		}, function(){
			callback();
		})
	}

	edit(user,db,callback){
		// console.log(ObjectID(user.id))
		db.collection('members').update(
		{"_id": ObjectID(user.id)},
		{
			$set:{
				"name": user.name,
				"year" : user.year,
				"belayCertified" : user.belayCertified,
				"position" : user.position,
				"isAdmin" : user.isAdmin
			}
		}, function(){
			callback();
		})
	}

	remove(id, db, callback){
		db.collection('members').remove({"_id":ObjectID(id)});
	}

	//
	addUser(){
		let self = this;
		let user = this.req.body.member;
		// console.log("USER SERVICE ADD: ",  user)
		try{
			MongoClient.connect(url, (err,client)=>{
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
	getUser(){
		let self = this;
		try{
			MongoClient.connect(url, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				let members = [];
				let cursor = db.collection('members').find();

				cursor.each((err,doc)=>{
					assert.equal(err,null);
					if (doc != null) {members.push(doc)}
					else{
						return self.res.status(200).json({
							status:"success",
							data:members
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
	editUser(){
		let self = this;
		let user = this.req.body.member;
		// console.log("USER SERVICE EDIT: ",  user)
		try{
			MongoClient.connect(url, (err,client)=>{
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
	removeUser(){
		let self = this;
		let id = this.req.body.id;
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

module.exports = UserService;