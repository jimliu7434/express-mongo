const { Schema, model } = require('mongoose');

const AnswerSchema = new Schema({
    id: String,
    value: String,
});

const QuestionSchema = new Schema({
    version: String,
    page: Number,
    id: String,
    name: String,
    question: String,
    answers: [AnswerSchema],
    type: String,
});

const Question = model('Question', QuestionSchema);

module.exports = Question;