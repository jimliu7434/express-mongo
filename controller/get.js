module.exports = async function (req, res) {
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