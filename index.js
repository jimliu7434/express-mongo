require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const express = require('express');

const {
    MONGO_HOST,
    MONGO_DB,
} = process.env;

const client = new MongoClient(MONGO_HOST, { useUnifiedTopology: true });
client.connect(function (err) {
    if (err) {
        console.error(err.message);
        return;
    }

    console.log('Connected successfully to server');

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

    app.get('/find',
        function (req, res, next) {
            console.log('calling /find');
            next();
        },
        async function (req, res) {
            if (!req.db) {
                res.send({ msg: 'db not found' }).status(500);
                return;
            }

            // Get the documents collection
            const collection = req.db.collection('mydocs');
            // Insert some documents
            try {
                const result = await collection.find().toArray();
                return res.json(result).status(200);
            } catch (error) {
                console.error(error.message);
                res.send({ msg: 'finding failed' }).status(500);
                return;
            }
        }
    );

    app.post('/save',
        function (req, res, next) {
            console.log('calling /save');
            next();
        },
        async function (req, res) {
            if (!req.db) {
                res.send({ msg: 'db not found' }).status(500);
                return;
            }

            if (!req.body || !Array.isArray(req.body)) {
                res.send({ msg: 'body is not array' }).status(400);
                return;
            }

            // Get the documents collection
            const collection = req.db.collection('mydocs');
            // Insert some documents
            try {
                const result = await collection.insertMany(req.body);
                return res.json(result).status(200);
            } catch (error) {
                console.error(error.message);
                res.send({ msg: 'inserting failed' }).status(500);
                return;
            }
        }
    );

    app.listen(5000)

    //client.close();
});