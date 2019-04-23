const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost';
const ObjectID = require('mongodb').ObjectID;

class EboardService{
	constructor(req,res){
		this.req = req;
		this.res = res;
	}

	insert(eboard, db, callback){
		db.collection('eboard').find({"position":eboard.position}).count()
			.then((res)=>{
				console.log("RETURNED: " , res)
				if (res != 0){
					console.log("EDITTING BITCH")
					this.editEboard();
				} else{
					console.log("NOT EDITTING BISH :(")
					db.collection('eboard').insertOne({
						"photo" : eboard.imagePath,
						"description" : eboard.description,
						"position" : eboard.position,
						"name" : eboard.name,
						"order" : eboard.order
					}, function(){
						callback();
					})
				}
			})
	}

	edit(eboard,db,callback){
		db.collection('eboard').update(
		{"position": eboard.position},
		{
			$set:{
				"description": eboard.description,
				"position": eboard.position,
				"name": eboard.name,
				"order": eboard.order
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
		let eboard = [];
		eboard["imagePath"] = this.req.file.path;
		eboard["description"] = this.req.body.description; 
		eboard["position"] = this.req.body.position; 
		eboard["name"] = this.req.body.name; 
		eboard["order"] = this.req.body.order; 
		console.log("EBOARD: ", eboard)
		try{
			MongoClient.connect(url, {useNewUrlParser:true}, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				self.insert(eboard,db,function(){
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


	//
	editEboard(){
		let self = this;
		let eboard = [];
		eboard["imagePath"] = this.req.file.path;
		eboard["description"] = this.req.body.description; 
		eboard["position"] = this.req.body.position; 
		eboard["name"] = this.req.body.name; 
		eboard["order"] = this.req.body.order; 
		console.log(eboard)
		try{
			MongoClient.connect(url, {useNewUrlParser:true}, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				self.edit(eboard,db,function(){
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