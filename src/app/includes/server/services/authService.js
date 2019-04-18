const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost';
const ObjectID = require('mongodb').ObjectID;

class authService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    getUsername() {
        let self = this;
        try {
            MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                var db = client.db('ClimbingClubDB')
                assert.equal(null, err);
                let eboard = [];
                let cursor = db.collection('eboard').find();

                cursor.each((err, doc) => {
                    assert.equal(err, null);
                    if (doc != null) { eboard.push(doc) }
                    else {
                        return self.res.status(200).json({
                            status: "success",
                            data: eboard
                        });
                    }
                });
            });
        }
        catch (error) {
            return self.res.status(500).json({
                status: "error",
                error: error
            });
        }
    }

    addUsername() {
        let self = this;
        let user = this.req.body.user;
        try {
            MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                var db = client.db('ClimbingClubDB')
                assert.equal(null, err);
                self.insert(user, db, function () {
                    return self.res.status(200).json({
                        status: "success"
                    })
                })
            });
        }
        catch (error) {
            return self.status(500).json({
                status: "500",
                error: error
            });
        }
    }

    insert(user, db, callback) {
        db.collection('eboard').insertOne({
            "username": user.username,
            "password": user.password
        }, function () {
            callback();
        })
    }

    compareUsername(token) {
        let self = this;
        let user = this.req.body.user;
        try {
            MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                var db = client.db('ClimbingClubDB')
                assert.equal(null, err);
                let eboard = [];
                let cursor = db.collection('eboard').find({
                    username: user.username,
                    password: user.password
                });

                cursor.each((err, doc) => {
                    assert.equal(err, null);
                    if (doc != null) { eboard.push(doc) }
                    else {
                        return self.res.status(200).json({
                            status: "success",
                            data: eboard
                        });
                    }
                });
            });
        }
        catch (error) {
            return self.res.status(500).json({
                status: "error",
                error: error
            });
        }
    }
}

module.exports = authService;