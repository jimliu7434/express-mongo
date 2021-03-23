module.exports = async function (req, res) {
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