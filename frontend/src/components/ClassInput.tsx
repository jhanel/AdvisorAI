
import React, {useEffect, useState} from "react";
import { Dropdown } from 'primereact/dropdown';
// import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.css";
import "./ClassInputCSS.css";
import FallingLeaves from "./FallingLeaves";
import { Calendar } from 'primereact/calendar';

//for server
const app_name = 'studentadvisorai.xyz';

function buildPath(route:string) : string{
    if (process.env.NODE_ENV != 'development')
    {
    return 'http://' + app_name + ':5002/' + route;
    }
    else
    {
    return 'http://localhost:5002/' + route;
    }
}



function ClassInput(){
    //time slots and days of week so user can update availability
    type TimeSlot = {
        start_time: string;
        end_time: string;
    };
    
    type Availability = {
        [key in "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"]: TimeSlot[];
    };

    const [availability, setAvailability] = useState<Availability>({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    });

    const handleAvailabilityChange = (day: keyof Availability, index: number, field: keyof TimeSlot, value: string) => {
        const updatedAvailability = { ...availability };
        updatedAvailability[day][index][field] = value;
        setAvailability(updatedAvailability);
    };

    const addTimeSlot = (day: keyof Availability) => {
        setAvailability(prevAvailability => ({
            ...prevAvailability,
            [day]: [...prevAvailability[day], { start_time: "", end_time: "" }]
        }));
    };

    //incase the user wants to delete availability
    const removeTimeSlot = (day: keyof Availability, index: number) => {
        setAvailability(prevAvailability => {
            const updatedAvailability = { ...prevAvailability };
            updatedAvailability[day].splice(index, 1);
            return updatedAvailability;
        });
    };

    const daysOfWeek: (keyof Availability)[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const renderTimeSlots = (day: keyof Availability) => {
        return availability[day].map((timeSlot, index) => (
            <div key={index} className="time-slot">
                <br/>
                <span>Start Time:</span>
                <InputText
                    value={timeSlot.start_time}
                    onChange={(e) => handleAvailabilityChange(day, index, 'start_time', e.target.value)}
                    className="custom-input"
                    placeholder="ex: 15:00"
                />
                <span>End Time:</span>
                <InputText
                    value={timeSlot.end_time}
                    onChange={(e) => handleAvailabilityChange(day, index, 'end_time', e.target.value)}
                    className="custom-input"
                    placeholder="ex: 17:00"
                />
                <Button label="Remove" onClick={() => removeTimeSlot(day, index)} className="p-button-danger p-button-outlined" />
            </div>
        ));
    };

        // const [calendar, setCalendar] = React.useState<DayPilot.Calendar>();
    
        // const contextMenu = new DayPilot.Menu({
        //     items: [
        //         {
        //             text: "Delete",
        //             onClick: async args => {
        //                 calendar?.events.remove(args.source);
        //             },
        //         },
        //         {
        //             text: "-"
        //         },
        //     ]
        // });
    
        // const onBeforeEventRender = (args: DayPilot.CalendarBeforeEventRenderArgs) => {
        //     args.data.areas = [
        //         {
        //             top: 5,
        //             right: 5,
        //             width: 20,
        //             height: 20,
        //             symbol: "icons/daypilot.svg#minichevron-down-2",
        //             fontColor: "#fff",
        //             backColor: "#00000033",
        //             style: "border-radius: 25%; cursor: pointer;",
        //             toolTip: "Show context menu",
        //             action: "ContextMenu",
        //         },
        //     ];
        // };
    
        // const initialConfig: DayPilot.CalendarConfig = {
        //     viewType: "Week",
        //     durationBarVisible: false,
        // };
    
        // const [config] = useState(initialConfig);

    
        // const onTimeRangeSelected = async (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
        //     calendar?.events.add({
        //         start: args.start,
        //         end: args.end,
        //         id: DayPilot.guid(),
        //         text: "Available",
        //         backColor: '#009da8',
        //     });
        // };
    

        //handles how many classes the user is taking
        type ClassOption = { name: string; code: string };

        const [selectedClassNum, setSelectedClassNum] = useState<ClassOption | null>(null);
        
        const numClasses: ClassOption[] = [
            { name: '1', code: '1' },
            { name: '2', code: '2' },
            { name: '3', code: '3' },
            { name: '4', code: '4' },
            { name: '5', code: '5' }
        ];

    const [courses, setCourses] = React.useState<string[]>([]);
    const [difficulty, setDifficulty] = useState<{ [key: number]: string }>({});
    const [exams, setExams] = useState<{ [key: number]: (Date | null)[] }>({});
    const [message,setMessage] = useState('');

    //level of help needed
    const difficultyLevels = [
        { name: 'Easy', code: 'Easy' },
        { name: 'Medium', code: 'Medium' },
        { name: 'Hard', code: 'Hard' },
        { name: 'Extremely Hard', code: 'Extremely Hard' }
    ];

    //will adjust for the num of classes so they can input proper courses
    useEffect(() => {
        if (selectedClassNum) {
            setCourses(new Array(parseInt(selectedClassNum.code)).fill(""));
            setExams({});
        }
    }, [selectedClassNum]);

    const newCourse = (index: number, value: string) => {
        const newCourses = [...courses];
        newCourses[index] = value;
        setCourses(newCourses);
    };

    const newDifficulty = (index: number, value: { name: string; code: string }) => {
        setDifficulty(prevDifficulty => ({
            ...prevDifficulty,
            [index]: value.name
        }));
    };

    // const newDifficulty = (index: number, value: string) => {
    //     setDifficulty({...difficulty, [index]: value});
    // };


    //adds exam slot for user
    const addNewExam = (index: number) => {
        setExams(prevExams => ({
            ...prevExams,
            [index]: [...(prevExams[index] || []), null]
        }));
    };

    //addexam api connection
    const addExam = async (index: number) => {
        const courseTitle = courses[index];
        const examDate = exams[index]; 
    
        // console.log("course title:", courseTitle);
        // console.log("exam date:", examDate);
    
        if (!courseTitle || !examDate) {
            setMessage("Course title and exam date are required.");
            return;
        }

        //for unique exam names
        const uniqueNames = examDate.map(async (examDate, examIndex) => {
            if (!examDate) return;

    
        const examData = {
            userID: userData.id,
            courseID: courseTitle,
            examname: `${courseTitle} Exam #${examIndex + 1}`,
            examdate: examDate.toISOString(),
        };
    
        // console.log("course title:", courseTitle);
        // console.log("exam date:", examDate);
        // console.log("exam name:", `${courseTitle} Exam #${examIndex + 1}`);
        // console.log("user id:", userData.id);

        try {
            const response = await fetch(buildPath('api/addexam'), {
                method: 'POST',
                body: JSON.stringify(examData),
                headers: { 'Content-Type': 'application/json' },
            });
    
            // const response = await fetch('http://localhost:5002/api/addexam',
            //     {method:'POST', body:JSON.stringify(examData), headers:{'Content-Type': 'application/json'}
            //     });
            var res = await response.json();
    
            if (!response.ok) {
                setMessage(res.error || 'Failed to add exam.');
                return;
            }
    
            setMessage(res.message || 'Exam added successfully!');
        } catch (error) {
            alert('Error: ' + error);
        }
        });
        await Promise.all(uniqueNames);
    };

    //deletes exam slot
    const removeExam = (courseIndex: number, examIndex: number) => {
        setExams(prevExams => {
            const updatedExams = { ...prevExams };
            updatedExams[courseIndex].splice(examIndex, 1);
            return updatedExams;
        });
    };

    const renderExamDates = (courseIndex: number) => {
        return exams[courseIndex]?.map((date, examIndex) => (
            <div key={examIndex} className="exam-date">
                <label className="custom-font">Exam Date:</label>
                <Calendar
                    value={date}
                    onChange={(e) => {
                        const newExams = { ...exams };
                        newExams[courseIndex][examIndex] = e.value as Date | null;
                        setExams(newExams);
                    }}
                    showTime
                    hourFormat="24"
                    className="custom-input"
                />
                <Button label="Remove Exam" onClick={() => removeExam(courseIndex, examIndex)} className="p-button-danger p-button-outlined" /> <br/>
            </div>
        ));
    };

    const [userData, setUserData] = useState<any>(null);
    useEffect(() => {
        const storedUserData = localStorage.getItem('user_data');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    //add course api connection
    async function addCourse(event: any, index: number): Promise<void> {
        event.preventDefault();
    
        const courseTitle = courses[index]; 
        const courseDifficulty = difficulty[index];
        const userID = userData.id;
        console.log('difficulty level:', courseDifficulty);
        console.log('user id:', userData.id)

        if (!userID || !courseTitle || !courseDifficulty) {
            setMessage("Missing required field(s).");
            console.log("Error: Missing required field(s).", { userID, courseTitle, courseDifficulty });
            return;
        }

        console.log("inside courseData:", { userID, coursetitle: courseTitle, difficulty: courseDifficulty });

        const courseData = {
            userID, 
            coursetitle: courseTitle,
            difficulty: courseDifficulty,
        };

        console.log('course title:', courses[index]);
        console.log('user id:', userData.id)
        console.log('difficulty level:', courseDifficulty);
   
    
        var js = JSON.stringify(courseData);
    
        try {
            const response = await fetch(buildPath('api/addcourse'),
            {method:'POST',body:js,headers:{'Content-Type':
            'application/json'}});
            // const response = await fetch('http://localhost:5002/api/addcourse', {
            //     method: 'POST',body: js,headers: { 'Content-Type': 'application/json' }
            // });
    
            var res = await response.json();
            console.log('API Response Body:', res);

    
            if (!response.ok) {
                setMessage(res.error || 'Failed to add course.');
                return;
            }

            console.log('course added', res.message);
            setMessage(res.message || `Course ${courseTitle} added successfully!`);
    
        } catch (error: any) {
            alert('Error: ' + error.toString());
        }
    }

    function genSchedule(event:any) : void
    {
        event.preventDefault();
        alert('genSchedule');
    };

    return (
        <div className="class-input-container">
            <div className = "background" ></div>
            <FallingLeaves />
            <h2 className = "title"> Available Schedule</h2>
                        <br /><br />
                        {daysOfWeek.map((day) => (
                <div key={day}>
                    <br />
                    <label className = "custom-day">{day}: </label>
                    {renderTimeSlots(day)}

                    <Button label="Add Time Slot" onClick={() => addTimeSlot(day)} className="custom-button" />
                </div>
            ))}
            <br />
            <label className = "custom-font">How many classes are you taking? &nbsp;</label>
            <Dropdown value={selectedClassNum} onChange={(e) => setSelectedClassNum(e.value)} options={numClasses} optionLabel="name" placeholder="Select Number of Classes" className="custom-dropdown" panelStyle={{backgroundColor: 'white' }}/>
            <br /><br />

            {courses.map((courses, index) => (
                <div key={index}>
                    <label className = "custom-font">Course Name: &nbsp;</label>
                    <InputText value={courses} onChange={(e) => newCourse(index, e.target.value)} placeholder= "Enter Course" className = "custom-input" />
                    <label className = "custom-font">&nbsp; Difficulty: &nbsp; </label>

                    <Dropdown value={difficulty[index]} onChange = {(e) => newDifficulty(index, e.value)} options={difficultyLevels} optionLabel="name" placeholder="Select Difficulty" className="custom-dropdown" panelStyle={{backgroundColor: 'white' }}/>
                    <br /><br />

                    <input type="submit" id="loginButton" className="custom-button" value = "Add Course"
                 onClick={(event) => addCourse(event, index)} /><br />

                 <span id="addCourseResults">{message}</span><br/>
                    <div className="exam-container">
                        <label className="custom-font">Exam Dates for {courses}: </label>
                        {renderExamDates(index)}
                        <Button label="Add New Exam Slot" onClick={() => addNewExam(index)} className="custom-button" />
                        <br/><br/>
                        <Button label="Add Exam(s)" onClick={() => addExam(index)} className="p-button-danger p-button-outlined" />

                        <br /><br />
                    </div>
                </div>
            ))}
            <br /><br />

            <Button label="Generate Schedule" onClick={genSchedule} className="custom-button primary" />
        </div>
    )

};

export default ClassInput;