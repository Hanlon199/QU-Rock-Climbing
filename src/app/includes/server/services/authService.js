const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost';
const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');

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
                let auth = [];
                let cursor = db.collection('auth').find();
                cursor.each((err, doc) => {
                    assert.equal(err, null);
                    if (doc != null) { auth.push(doc) }
                    else {
                        return self.res.status(200).json({
                            status: "success",
                            data: auth
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
        let auth = [];
        try {
            MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                var db = client.db('ClimbingClubDB')
                var userExist = false;
                assert.equal(null, err);
                let cursor = db.collection('auth').find({ username: user.username });
                cursor.each((err, doc) => {
                    assert.equal(err, null);
                    if (doc != null) {
                        auth.push(doc);
                    } else if (auth[0] != null) {
                        return self.res.status(200).json({
                            status: "fail",
                            msg: "username already in use"
                        })
                    } else if (auth[0] == null) {
                        self.insert(user, db, function () {
                            console.log("insert pass");
                            return self.res.status(200).json({
                                status: "success",
                                msg: "user sucessfully added"
                            })
                        })
                    }
                });
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
        var temp = "";
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                temp = hash;
                db.collection('auth').insertOne({
                    "username": user.username,
                    "password": temp
                }, function () {
                    callback();
                })
            });
        });

    }
    compareUsername() {
        let self = this;
        const username = this.req.body.user.username;
        const password = this.req.body.user.password;
        let auth = [];
        try {
            MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                var db = client.db('ClimbingClubDB')
                assert.equal(null, err);
                let cursor = db.collection('auth').find({
                    username: username
                });
                cursor.each((err, doc) => {
                    assert.equal(err, null);
                    if (doc != null) {
                        auth.push(doc);
                    }
                    else if (auth[0] == null) {
                        return self.res.status(200).json({
                            status: "fail",
                            msg: "That user does not exist"
                        });
                    } else {
                        bcrypt.compare(password, auth[0].password, function (err, res) {
                            if (res == true) {
                                const token = jwt.sign({data: auth[0].username}, "tg9IjkgX96", {
                                    expiresIn: 604800 // 1 week
                                });
                                return self.res.status(200).json({
                                    status: "success",
                                    msg: "logged in",
                                    token: token
                                })
                            } else if (res == false) {
                                return self.res.status(200).json({
                                    status: "false",
                                    msg: "incorrecto passwordo"
                                })
                            }
                        });
                    }
                });
            });
        }
        catch (error) {
            return self.status(500).json({
                status: "500",
                error: error
            });
        }
    }
}

module.exports = authService;