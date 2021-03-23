const mongoose = require('mongoose');

module.exports = async (mongoConnectionStr) => {
    try {
        await mongoose.connect(mongoConnectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    } catch (error) {
        console.error(error.message);
    }
    return {
        Question: require('./anwser'),
    };
}
