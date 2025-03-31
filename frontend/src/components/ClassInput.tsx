import {useEffect, useState} from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.css";
import "./ClassInputCSS.css";
import FallingLeaves from "./FallingLeaves";
import { Calendar } from 'primereact/calendar';

const app_name = 'studentadvisorai.xyz';

function buildPath(route:string) : string{
    if (process.env.NODE_ENV != 'development') {
        return 'http://' + app_name + ':5002/' + route;
    } else {
        return 'http://localhost:5002/' + route;
    }
}

function ClassInput(){
    type TimeSlot = {
        start_time: string;
        end_time: string;
    };

    type Availability = {
        [key in "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"]: TimeSlot[];
    };

    const [availability, setAvailability] = useState<Availability>({
        Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
    });

    const handleAvailabilityChange = (day: keyof Availability, index: number, field: keyof TimeSlot, value: string) => {
        const updated = { ...availability };
        updated[day][index][field] = value;
        setAvailability(updated);
    };

    const addTimeSlot = (day: keyof Availability) => {
        setAvailability(prev => ({ ...prev, [day]: [...prev[day], { start_time: "", end_time: "" }] }));
    };

    const removeTimeSlot = (day: keyof Availability, index: number) => {
        const updated = { ...availability };
        updated[day].splice(index, 1);
        setAvailability(updated);
    };

    const daysOfWeek: (keyof Availability)[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const renderTimeSlots = (day: keyof Availability) => (
        availability[day].map((slot, index) => (
            <div key={index} className="time-slot">
                <br />
                <span>Start Time:</span>
                <InputText value={slot.start_time} onChange={(e) => handleAvailabilityChange(day, index, 'start_time', e.target.value)} placeholder="ex: 15:00" className="custom-input" />
                <span>End Time:</span>
                <InputText value={slot.end_time} onChange={(e) => handleAvailabilityChange(day, index, 'end_time', e.target.value)} placeholder="ex: 17:00" className="custom-input" />
                <Button label="Remove" onClick={() => removeTimeSlot(day, index)} className="p-button-danger p-button-outlined" />
            </div>
        ))
    );

    type ClassOption = { name: string; code: string };
    const [selectedClassNum, setSelectedClassNum] = useState<ClassOption | null>(null);
    const numClasses: ClassOption[] = [
        { name: '1', code: '1' }, { name: '2', code: '2' }, { name: '3', code: '3' },
        { name: '4', code: '4' }, { name: '5', code: '5' }
    ];

    const [courses, setCourses] = useState<string[]>([]);
    const [difficulty, setDifficulty] = useState<{ [key: number]: string }>({});
    const [exams, setExams] = useState<{ [key: number]: (Date | null)[] }>({});
    const [message, setMessage] = useState('');

    const difficultyLevels = [
        { name: 'Easy', code: 'Easy' }, { name: 'Medium', code: 'Medium' },
        { name: 'Hard', code: 'Hard' }, { name: 'Extremely Hard', code: 'Extremely Hard' }
    ];

    useEffect(() => {
        if (selectedClassNum) {
            setCourses(new Array(parseInt(selectedClassNum.code)).fill(""));
            setExams({});
        }
    }, [selectedClassNum]);

    const newCourse = (index: number, value: string) => {
        const updated = [...courses];
        updated[index] = value;
        setCourses(updated);
    };

    const newDifficulty = (index: number, value: { name: string; code: string }) => {
        setDifficulty(prev => ({ ...prev, [index]: value.name }));
    };

    const addNewExam = (index: number) => {
        setExams(prev => ({ ...prev, [index]: [...(prev[index] || []), null] }));
    };

    const removeExam = (courseIndex: number, examIndex: number) => {
        const updated = { ...exams };
        updated[courseIndex].splice(examIndex, 1);
        setExams(updated);
    };

    const renderExamDates = (courseIndex: number) => (
        exams[courseIndex]?.map((date, examIndex) => (
            <div key={examIndex} className="exam-date">
                <label className="custom-font">Exam Date:</label>
                <Calendar value={date} onChange={(e) => {
                    const updated = { ...exams };
                    updated[courseIndex][examIndex] = e.value as Date | null;
                    setExams(updated);
                }} showTime hourFormat="24" className="custom-input" />
                <Button label="Remove Exam" onClick={() => removeExam(courseIndex, examIndex)} className="p-button-danger p-button-outlined" /><br />
            </div>
        ))
    );

    const [userData, setUserData] = useState<any>(null);
    useEffect(() => {
        const stored = localStorage.getItem('user_data');
        if (stored) setUserData(JSON.parse(stored));
    }, []);

    async function addCourse(event: any, index: number): Promise<void> {
        event.preventDefault();
        const courseTitle = courses[index];
        const courseDifficulty = difficulty[index];
        if (!userData?.id || !courseTitle || !courseDifficulty) return setMessage("Missing required field(s).")

        const courseData = {
            userID: userData.id,
            coursetitle: courseTitle,
            difficulty: courseDifficulty,
        };

        try {
            const response = await fetch(buildPath('api/addcourse'), {
                method: 'POST',
                body: JSON.stringify(courseData),
                headers: { 'Content-Type': 'application/json' }
            });
            const res = await response.json();
            if (!response.ok) return setMessage(res.error || 'Failed to add course.');
            setMessage(res.message || `Course ${courseTitle} added successfully!`);
        } catch (error: any) {
            alert('Error: ' + error.toString());
        }
    }

    async function genSchedule(event: any): Promise<void> {
        event.preventDefault();
        if (!userData?.id) return setMessage("User not found.");

        try {
            const response = await fetch(buildPath("api/generate-schedule"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userID: userData.id }),
            });

            const res = await response.json();

            if (!response.ok) {
                setMessage(res.error || "❌ Failed to generate schedule.");
            } else {
                setMessage("✅ Schedule generated successfully!");
                setTimeout(() => { window.location.href = "/dashboard"; }, 2000);
            }
        } catch (err) {
            console.error("Error generating schedule:", err);
            setMessage("⚠️ Could not reach the server.");
        }
    }

    return (
        <div className="class-input-container">
            <div className="background"></div>
            <FallingLeaves />
            <h2 className="title"> Available Schedule</h2>
            <br /><br />

            {daysOfWeek.map((day) => (
                <div key={day}>
                    <br />
                    <label className="custom-day">{day}: </label>
                    {renderTimeSlots(day)}
                    <Button label="Add Time Slot" onClick={() => addTimeSlot(day)} className="custom-button" />
                </div>
            ))}

            <br />
            <label className="custom-font">How many classes are you taking? &nbsp;</label>
            <Dropdown value={selectedClassNum} onChange={(e) => setSelectedClassNum(e.value)} options={numClasses} optionLabel="name" placeholder="Select Number of Classes" className="custom-dropdown" panelStyle={{ backgroundColor: 'white' }} />
            <br /><br />

            {courses.map((course, index) => (
                <div key={index}>
                    <label className="custom-font">Course Name: &nbsp;</label>
                    <InputText value={course} onChange={(e) => newCourse(index, e.target.value)} placeholder="Enter Course" className="custom-input" />
                    <label className="custom-font">&nbsp; Difficulty: &nbsp;</label>
                    <Dropdown value={difficulty[index]} onChange={(e) => newDifficulty(index, e.value)} options={difficultyLevels} optionLabel="name" placeholder="Select Difficulty" className="custom-dropdown" panelStyle={{ backgroundColor: 'white' }} />
                    <br /><br />
                    <input type="submit" className="custom-button" value="Add Course" onClick={(e) => addCourse(e, index)} /><br />
                    <span>{message}</span><br />

                    <div className="exam-container">
                        <label className="custom-font">Exam Dates for {course}: </label>
                        {renderExamDates(index)}
                        <Button label="Add New Exam Slot" onClick={() => addNewExam(index)} className="custom-button" /><br /><br />
                    </div>
                </div>
            ))}

            <br /><br />
            {message && (
                <span style={{ display: 'block', color: 'white', marginTop: '10px', fontWeight: 'bold' }}>
                    {message}
                </span>
            )}

            <Button label="Generate Schedule" onClick={genSchedule} className="custom-button primary" />
        </div>
    );
};

export default ClassInput;
