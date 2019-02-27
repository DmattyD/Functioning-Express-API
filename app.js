const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
let ObjectID = require('mongodb').ObjectID;
const app = express();
const url = 'mongodb://mddever:Password@cluster0-shard-00-00-hiisr.gcp.mongodb.net:27017,cluster0-shard-00-01-hiisr.gcp.mongodb.net:27017,cluster0-shard-00-02-hiisr.gcp.mongodb.net:27017/Practice?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const db = url;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db, (err,db) => {
    if (err) return console.log("Has Not Connected")
    app.listen(4000, () => {
        console.log("Shit has connected")})
    
    
let dbase = db.db("Practice");

app.post('/products/add', (req, res) => {
    let products = {
        name: req.body.name,
        category: req.body.category
    };

    dbase.collection("things").save(products, (err, result) => {
        if(err) {
            console.log(error);
        } res.send('product added');
    })
});

app.get('/products/:id', (req, res) => {
    if(err) {
        throw err;
    }
    let id = ObjectID(req.params.id);
    dbase.collection('things').find(id).toArray((err, result) => {
        if(err) {
            throw err;
        } res.send(result);
    });
});

app.put('/products/update/:id', (req, res) => {
    var id = {
        _id: new ObjectID(req.params.id)
    };

    dbase.collection("things").update(id, {$set:{name: req.body.name}}, (err, result) => {
        if(err) {
            throw err;
        }
        res.send('name updated successfully');
    });
    dbase.collection("things").update(id, {$set:{category: req.body.category}}, (err, result) => {
        if(err) {
            throw err;
        }
        res.send('category updated successfully');
    });
    });

app.delete('/products/delete/:id', (req, res) => {
    let id = ObjectID(req.params.id);

    dbase.collection('things').deleteOne({_id: id}, (err, result) => {
        if(err) {
            throw err;
        }
        res.send('product deleted');}
    )});
    })  
//// in order to delete, the path MUST INCLUDE '/products/delete/*productid*