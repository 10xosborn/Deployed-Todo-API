const mongose = require('mongoose');

const todoSchema = new mongose.Schema({
    task: {
        type: String,
        required: true,
        minlength: 3,
        maxlenght: 100
    },
    completed: {
        type: Boolean,
        default: false
    },
}, 
    { timestamps: true }    
);

const TodoModel = mongose.model('Todo', todoSchema);

module.exports = TodoModel;