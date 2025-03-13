// Course Schema

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema                     // define Course Schema
({
    userId: 
    {   type: mongoose.Schema.Types.ObjectId,               // references ObjectId of User document
        ref: 'User',                                        // links to User collection
        required: true                                      // ensures every course is associated with a user
    },

    exam:
    {
        type: String,                                       // name of exam
        default: null                                       // if no exam provided, null
    },

    assignment:
    {
        type: String,                                       // name of assignment
        default: null                                       // if no assignment provided, null
    },

    quiz:
    {
        type: String,                                       // name of quiz
        default: null                                       // if no quiz provided, null
    }
    
}, { timestamps: true } );                                  // displays when user created and updated their course(s)

module.exports = mongoose.model('Course', CourseSchema);