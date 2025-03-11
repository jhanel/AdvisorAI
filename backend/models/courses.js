const mongoose = require('mongoose');

// Counter Schema for Auto-Increment 

const CounterSchema = new mongoose.Schema
({
    _id: { type: String , required: true },
    seq: { type: Number , default: 0 }
});

const Counter = mongoose.model("Counter", CounterSchema);

// Course Schema

const CourseSchema = new mongoose.Schema                     // define Course Schema
({
    courseId: { type: Number , unique: true },              // auto-increment courseId

    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true                                      // ensures every course belongs to a user
    },

    name: { type: String, required: true },
    description: { type: String },

    difficulty: 
    { 
        type: String, 
        enum: [ "Easy" , "Medium" , "Hard" ],               
        required: true 
    },

    duration: { type: Number , required: true },            // in hours

    exams:
    [
        {
            title: String,
            date: Date
        }
    ],
    assignments:
    [
        {
            title: String,
            date: Date
        }
    ],
    quiz:
    [
        {
            title: String,
            date: Date
        }
    ],
    
}, { timestamps: true } );                                  // displays when user created and updated their course(s)

// Auto-Increment for courseId

CourseSchema.pre("save", async function (next)              
    {
        if( !this.courseId )                                // check if courseId is NOT alrdy set
        {
            try
            {
                let counter = await Counter.findByIdAndUpdate(      // searches for document in Counters collection with _id: "courseId"
                    { _id: "courseId" },
                    { $inc: { seq: 1 } },                           // increments by 1
                    { new: true , upsert: true }                    // returns updated document after incrementing (new: true)
                );                                                  //      if it's not found, create one (upsert:true)

                this.courseId = counter.seq;                        // assign updated counter.seq to courseId to make it available for the next one
            } catch ( err )
            {
                return next( err );
            }
        }

        next();     // if courseId alrdy set, skips to next one
    }
);

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;