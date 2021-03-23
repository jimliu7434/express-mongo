require('dotenv').config();
const express = require('express');

const {
    SERVER_WEBPORT,
    MONGO_HOST,
    MONGO_DB,
} = process.env;

const mongo = require('./model/');
(async () => {
    const db = await mongo(`${MONGO_HOST}/${MONGO_DB}`);

    console.log('MongoDB connected');

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
        .delete(deleteHandler)
        .put(putHandler);


    app.use('/myapp', router);

    app.listen(Number(SERVER_WEBPORT), () => {
        console.log(`Listening ${SERVER_WEBPORT}`);
    });
})();
