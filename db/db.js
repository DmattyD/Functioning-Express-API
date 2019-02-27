const MongoClient = require('mongodb').MongoClient;
const ObjectId = requrie('mongodb').ObjectId;
const dbname = 'Practice';
const mongoOptions = {useNewUrlParser : true};
const url = 'mongodb://mddever:Password@cluster0-shard-00-00-hiisr.gcp.mongodb.net:27017,cluster0-shard-00-01-hiisr.gcp.mongodb.net:27017,cluster0-shard-00-02-hiisr.gcp.mongodb.net:27017/Practice?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

const state = {
    db: null

};

const connect = (cb) => {
    if(state.db)
        cb();
    else{
        MongoClient.connect(url,mongoOptions,(err,client) =>{
            if(err)
                cb(err)
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

const getPrimaryKey = (_id) => {
    return ObjectId(_id);
}

const getDb = () => {
    return state.db;
}

module.exports = {getDb,connect,getPrimaryKey};