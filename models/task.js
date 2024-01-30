const mongoose = require('mongoose');
const loginSchema = require('./user')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'must provide the title'],
        trim: true
    },
    /*complete: {
        type: Boolean,
        default: false,
    },*/
    status: {
        type: String,
        required: true,
        enum: ['completed', 'pending'],
        default: 'pending',
        trim: true
    },
    /*EndDate: {
        type: Date,
        required: true,
        trim: true
    },*/
    /*owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'collection' 
    }*/
    
}, {timestamps: true})

//const Task = mongoose.model('Task', taskSchema);

module.exports = taskSchema;
