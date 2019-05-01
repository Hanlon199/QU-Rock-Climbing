const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost';
const ObjectID = require('mongodb').ObjectID;

class ApplicantService{
	constructor(req,res){
		this.req = req;
		this.res = res;
	}

	insert(user, db, callback){
		db.collection('applicant').insertOne({
			"name": user.name,
			"email" : user.email,
			"year" : user.year,
			"belayCertified" : user.belayCertified,
			"reasoning" : user.reasoning
		}, function(){
			callback();
		})
	}

	remove(id, db, callback){
		db.collection('applicant').deleteOne({"_id":ObjectID(id)});
	}

	//
	addApplicant(){
		let self = this;
		let applicant = this.req.body.applicant;
		try{
			MongoClient.connect(url, {useNewUrlParser:true}, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				self.insert(applicant,db,function(){
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
	getApplicants(){
		let self = this;
		try{
			MongoClient.connect(url, {useNewUrlParser:true}, (err,client)=>{
				var db = client.db('ClimbingClubDB')
				assert.equal(null,err);
				let applicants = [];
				let cursor = db.collection('applicant').find();

				cursor.each((err,doc)=>{
					assert.equal(err,null);
					if (doc != null) {applicants.push(doc)}
					else{
						return self.res.status(200).json({
							status:"success",
							data:applicants
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
	removeApplicant(){
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

module.exports = ApplicantService;