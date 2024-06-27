const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        require: true
    }
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
