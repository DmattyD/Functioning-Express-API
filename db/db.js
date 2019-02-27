const Datastore = require('nedb')

const Datastore = require('nedb')
, db = new Datastore({filename: '/db', autoload: true});