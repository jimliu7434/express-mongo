module.exports = async function (req, res) {
    if (!req.db) {
        res.send({ msg: 'db not found' }).status(500);
        return;
    }

    if (!req.body) {
        res.send({ msg: 'post body cannot be empty' }).status(400);
        return;
    }

    // TODO: check body
    //  Example
    //  {
    //     version: "20201", 
    //     page: 1,
    //     id: 'CERZPa',
    //     question: '1. XXXXXXXXXXXXXXXXXXXXX',
    //     answers: [{ id: 'q1_1', value: "很不同意" }, { id: 'q1_2', value: "不同意" }, { id: 'q1_3', value: "不太同意" }, { id: 'q1_4', value: "同意" }, { id: 'q1_5', value: "很同意" }],
    //     name: 'q1',
    //     type: 'radio'
    //   }
    // Insert some documents
    const {
        version,
        page,
        id,
        name,
        question,
        answers,
        type,
    } = req.body;

    try {
        const questionObj = new req.db.Question({ 
            version,
            page,
            id,
            name,
            question,
            answers,
            type, 
        });
        await questionObj.save();
        return res.send().status(200);
    } catch (error) {
        console.error(error.message);
        res.send({ msg: 'post failed' }).status(500);
        return;
    }
}