module.exports = async function (req, res) {
    if (!req.db) {
        res.send({ msg: 'db not found' }).status(500);
        return;
    }

    try {
        const questions = await req.db.Question.find({}).exec();
        return res.json(questions).status(200);
    } catch (error) {
        console.error(error.message);
        res.send({ msg: 'finding failed' }).status(500);
        return;
    }
}