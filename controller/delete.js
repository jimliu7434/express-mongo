module.exports = async function (req, res) {
    if (!req.db) {
        res.send({ msg: 'db not found' }).status(500);
        return;
    }

    try {
        await req.db.Question.deleteMany({}).exec();
        return res.send().status(200);
    } catch (error) {
        console.error(error.message);
        res.send({ msg: 'deleting failed' }).status(500);
        return;
    }
}