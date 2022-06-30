const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('connected successfully to db server');

    // database Name
    const dbName = 'badbank';
    db = client.db(dbName);
    console.log('///////////////////////////////////////////////////////////////////////')
    console.log(db);
    console.log('///////////////////////////////////////////////////////////////////////')
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users')
        const doc = {name, email, password, balance: 500};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err? reject(err) : resolve(doc);
        });
    });   
};

// find single user
function find(email){
    console.log('find was called')
    return new Promise((resolve, reject) => {
        const customers = db.collection('users')
        .find({email: email})
        .toArray(function(err, docs) {
            err? reject(err):resolve(docs);
        })
    })
};

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
};

// find all users
function all(){
    return new Promise((resolve, reject) => {
        const customers = db.collection('users').find({}).toArray(function(err, docs) {
            err? reject(err):resolve(docs);
        })
    })
}

// update - deposit/withdraw amount
function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
}

module.exports = {create, find, findOne, update, all};