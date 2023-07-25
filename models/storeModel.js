const mgoose = require('mongoose');
const dotenv = require('dotenv');
const MongoDBStore = require('connect-mongo');

const Schema = mgoose.Schema;
dotenv.config({path: './config.env'});
//const session = require('express-session');
//const session = require('express-session');
//const mongoDBSession = require('connect-mongodb-session')(session);

/*
const store = new mongoDBSession({
    uri: process.env.CON_STR,
    collection: 'mySession',
})
*/


const store = MongoDBStore.create({
    mongoUrl: process.env.CON_STR
})

module.exports = store;

