const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost';
const ObjectID = require('mongodb').ObjectID;

class NewsService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    insert(news, db, callback) {
        db.collection('news').insertOne({
            "name": news.name,
            "description": news.description,
            "link": news.link
        }, function() {
            callback();
        });
    }

    edit(news, db, callback) {
        db.collection('news').update(
            {"_id": ObjectID(news.id)},
            {
                $set:{
                    "name": news.name,
                    "description": news.description,
                    "link": news.link
                }
            }, function(){
                callback();
            });
    }

    remove(id, db, callback) {
        db.collection('news').remove({"_id":ObjectID(id)});
    }

    addNews(){
        let self = this;
        let news = this.req.body.news;

        try {
            MongoClient.connect(url, (err, client) => {
                var db = client.db('ClimbingClubDB')
                assert.equal(null, err);
                self.insert(news, db, function() {
                    return self.res.status(200).json({
                        status:"success"
                    })
                })
            });
        }
        catch(error) {
            return self.status(500).json({
                status:"500",
                error: error
            });
        }
    }

    getNews() {
        let self = this;
        try {
            MongoClient.connect(url, (err, client) => {
                var db = client.db("ClimbingClubDB")
                assert.equal(null, err);
                let news = [];
                let cursor = db.collection('news').find();

                cursor.each((err, doc) => {
                    assert.equal(err, null);
                    if (doc != null) {news.push(doc)}
                    else {
                        return self.res.status(200).json({
                            status: "success",
                            data: news
                        });
                    }
                });
            });
        }
        catch (error) {
            return self.res.status(500).json({
                status:"error",
                error: error
            });
        }
    }


    editNews(){
		let self = this;
		let event = this.req.body.news;
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

    removeNews(){
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

module.exports = NewsService;