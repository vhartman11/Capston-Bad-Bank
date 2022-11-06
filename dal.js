const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://vhartman11:MITcode2022@cluster0.iax0yuf.mongodb.net/?retryWrites=true&w=majority"
//const url = 'mongodb://localhost:27017';
let db    = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log('Connected successfully to db server');

    // connect to myproject database
   db = client.db('badbank');
});

// create user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
};

// all users
function all() {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find()
            .toArray(function(err, docs) {
                console.log(docs)
                err ? reject(err) : resolve(docs);
            });
    });
};

// update - deposit amount
function deposit(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnDocument: 'after'},
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
};

// update - withdraw amount
function withdraw(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: -amount } },
                { returnDocument: 'after' },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
};

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    });
};

// login account 
function login(email, password) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                try {
                    err ? reject('DB err') : docs[0].password === password ? resolve(docs) : reject('Please try again.')
                } catch {
                    reject('Please try again.')
                }
                 
            });
    });
};

module.exports = {create, all, login, findOne, deposit, withdraw};