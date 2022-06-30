const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('connected');

    // database Name
    const dbName = 'my-project';
    const db = client.db(dbName);

    // new user
    var name = 'user' + Math.floor(Math.random() * 10000);
    var email = name + '@mit.edu';

    // insert into customer
    var collection = db.collection('customers');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result) {
        console.log('Document inserted')
    });

    var customers = db.collection('customers').find().toArray(function(err, docs){
        console.log('Collection found', docs);

        //clean up
        client.close();
    })
});