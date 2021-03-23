require('dotenv').config();
//https://docs.mongodb.com/drivers/node/fundamentals/crud/
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

    const router = express.Router();
    // router + middleware
    router.use(function (req, res, next) {
        console.log(`calling [${req.method}] ${req.originalUrl}`);
        next();
    });

    router.route('/').get(
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
    ).post(
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
    ).delete(
        async function (req, res) {
            if (!req.db) {
                res.send({ msg: 'db not found' }).status(500);
                return;
            }

            // Get the documents collection
            const collection = req.db.collection('mydocs');
            // Insert some documents
            try {
                const result = await collection.deleteMany({
                    a: {
                        $gt: 0,
                    }
                });
                return res.json(result).status(200);
            } catch (error) {
                console.error(error.message);
                res.send({ msg: 'deleting failed' }).status(500);
                return;
            }
        }
    );

    router.put('/:a',
        async function (req, res) {
            if (!req.db) {
                res.send({ msg: 'db not found' }).status(500);
                return;
            }

            if (!req.params.a) {
                res.send({ msg: 'need condition a' }).status(400);
                return;
            }

            if (!req.body) {
                res.send({ msg: 'body is not a object' }).status(400);
                return;
            }

            // Get the documents collection
            const collection = req.db.collection('mydocs');
            // Insert some documents
            try {
                const result = await collection.updateMany({ a: Number(req.params.a) }, { $set: { b: req.body } });
                return res.json(result).status(200);
            } catch (error) {
                console.error(error.message);
                res.send({ msg: 'updating failed' }).status(500);
                return;
            }
        }
    );


    app.use('/myapp', router);
    app.listen(5000)

    //client.close();
});