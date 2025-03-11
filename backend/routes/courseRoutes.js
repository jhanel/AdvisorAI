const express = require("express");                 // import Express framework
const Course = require("../models/courses");        // import courses from models folder
const router = express.Router();                    // create new Express router instance

// create a new course

router.post("/add", async (req, res) => {
    try
    {
        const { userId , name , description , difficulty , duration } = req.body;                // extract course details from request body        
        if (!userId)
          return res.status(400).json({ message: "userId is required" });

        userId = new mongoose.Types.ObjectId(userId);
        
        const newCourse = new Course({ name , description , difficulty , duration });   // create new Course instance
        await newCourse.save();     // save new course to MongoDB

        res.status(201).json({ message: "Course created!" , course: newCourse });
    } catch ( error )
    {
        res.status(500).json({ message: "Error creating course." , error });
    }
});

// fetch courses

router.get("/", async (req, res) => {
    try
    {
        const courses = await Course.find();        // retrieve all courses from db
        res.status(200).json(courses);              // return list of courses
    } catch ( error )
    {
        res.status(500).json({ message: "Error fetching courses." , error });
    }
});

// fetch course by id (filtered by userId)

router.get("/:userId/:id", async (req, res) => {
    try
    {
        const { userId, id } = req.params;                                              // extract userId and courseId from request params

        const course = await Course.findOne({ userId: userId, courseId: id });          // find course by userId and courseId

        if( !course ) return res.status(404).json({ message: "Course not found." });   // return 404 if course doesn't exist
        
        res.status(200).json(course);                                                  // return course data if found
    } 
    catch ( error ) 
    {
        res.status(500).json({ message: "Error fetching course.", error });            // handle server errors
    }
});


// update course by id

router.put("/:id", async (req, res) => {
    try {
      const updatedCourse = await Course.findOneAndUpdate(
        { courseId: req.params.id },            // find course by courseId
        req.body,                               // update with new request body data
        { new: true }                           // return updated document
      );
      if ( !updatedCourse ) return res.status(404).json({ message: "Course not found" });
      res.status(200).json({ message: "Course updated", course: updatedCourse });
    } catch ( error ) 
    {
      res.status(500).json({ message: "Error updating course", error });
    }
});

// delete course by id

router.delete("/:id", async (req, res) => {
    try {
      const deletedCourse = await Course.findOneAndDelete({ courseId: req.params.id });
      if ( !deletedCourse ) return res.status(404).json({ message: "Course not found" });
      res.status(200).json({ message: "Course deleted" });
    } catch ( error ) 
    {
      res.status(500).json({ message: "Error deleting course", error });
    }
});
  
  module.exports = router;      // export router for use in server.js