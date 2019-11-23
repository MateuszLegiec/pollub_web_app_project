const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        title:{type: String, required: true, unique: true},
        description:{type: String, required: true},
        creationDate: Date,
        deadline: Date,
        priority: Number,
        orderedBy:{ type: String},
        assignedUser:{ type: String},
        status:{type: String},
        comments: [{
                creationDate: Date,
                user: String,
                content: String,
        }],
        version: Number
    }
);

taskSchema.path('description').validate(function (v) {return v.length < 100;},'The maximum length of description is 100');
taskSchema.path('title').validate(function (v) {return v.length < 10;},'The maximum length of title is 10');

const Task = mongoose.model('Task',taskSchema);
module.exports = Task;
