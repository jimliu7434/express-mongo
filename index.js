require('dotenv').config();
//https://docs.mongodb.com/drivers/node/fundamentals/crud/
const MongoClient = require('mongodb').MongoClient;
const express = require('express');

const {
    SERVER_WEBPORT,
    MONGO_HOST,
    MONGO_DB,
} = process.env;

const client = new MongoClient(MONGO_HOST, { useUnifiedTopology: true });
client.connect(function (err) {
    if (err) {
        console.error(err.message);
        return;
    }

    console.log('MongoDB connected');

    const db = client.db(MONGO_DB);

    const app = express();

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }))

    // parse application/json
    app.use(express.json())

    // middleware
    app.use(function (req, res, next) {
        req.db = db;
        next();
    });

    const router = express.Router();
    // router + middleware
    router.use(function (req, res, next) {
        console.log(`calling [${req.method}] ${req.originalUrl}`);
        next();
    });


    const { 
        get: getHandler,
        post: postHandler,
        delete: deleteHandler,
        put: putHandler,
    } = require('./controller/');

    router.route('/')
        .get(getHandler)
        .post(postHandler)
        .delete(deleteHandler);

    router.put('/:a',putHandler);

    app.use('/myapp', router);

    app.listen(Number(SERVER_WEBPORT), () => {
        console.log(`Listening ${SERVER_WEBPORT}`);
    });

    //client.close();
});