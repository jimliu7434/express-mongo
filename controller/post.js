module.exports = async function (req, res) {
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