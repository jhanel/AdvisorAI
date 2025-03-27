
import React, {useEffect, useState} from "react";
import { Dropdown } from 'primereact/dropdown';
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.css";
import "./ClassInputCSS.css";
import FallingLeaves from "./FallingLeaves";
import { Calendar } from 'primereact/calendar';

// const app_name = 'studentadvisorai.xyz';

// function buildPath(route:string) : string{
//     if (process.env.NODE_ENV != 'development')
//     {
//     return 'http://' + app_name + ':5002/' + route;
//     }
//     else
//     {
//     return 'http://localhost:5002/' + route;
//     }
// }


function ClassInput(){
        const [calendar, setCalendar] = React.useState<DayPilot.Calendar>();
    
        const contextMenu = new DayPilot.Menu({
            items: [
                {
                    text: "Delete",
                    onClick: async args => {
                        calendar?.events.remove(args.source);
                    },
                },
                {
                    text: "-"
                },
            ]
        });
    
        const onBeforeEventRender = (args: DayPilot.CalendarBeforeEventRenderArgs) => {
            args.data.areas = [
                {
                    top: 5,
                    right: 5,
                    width: 20,
                    height: 20,
                    symbol: "icons/daypilot.svg#minichevron-down-2",
                    fontColor: "#fff",
                    backColor: "#00000033",
                    style: "border-radius: 25%; cursor: pointer;",
                    toolTip: "Show context menu",
                    action: "ContextMenu",
                },
            ];
        };
    
        const initialConfig: DayPilot.CalendarConfig = {
            viewType: "Week",
            durationBarVisible: false,
        };
    
        const [config] = useState(initialConfig);

    
        const onTimeRangeSelected = async (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
            calendar?.events.add({
                start: args.start,
                end: args.end,
                id: DayPilot.guid(),
                text: "Available",
                backColor: '#009da8',
            });
        };
    

    const [selectedClassNum, setSelectedClassNum] = useState(null);
    const numClasses = [
        { name: '1', code: '1' },
        { name: '2', code: '2' },
        { name: '3', code: '3' },
        { name: '4', code: '4' },
        { name: '5', code: '5' }
    ];

    const [courses, setCourses] = useState<string[]>([]);
    const [difficulty, setDifficulty] = useState<{ [key: number]: string }>({});
    const [exams, setExams] = useState<{ [key: number]: (Date | null)[] }>({});

    const difficultyLevels = [
        { name: 'Easy', code: 'Easy' },
        { name: 'Medium', code: 'Medium' },
        { name: 'Hard', code: 'Hard' },
        { name: 'Extremely Hard', code: 'Extremely Hard' }
    ];

    //will adjust for the num of classes so they can input proper courses
    useEffect(() => {
        if (selectedClassNum) {
            setCourses(new Array(parseInt(selectedClassNum)).fill(""));
            setExams({});
        }
    }, [selectedClassNum]);

    const newCourse = (index: number, value: string) => {
        const newCourses = [...courses];
        newCourses[index] = value;
        setCourses(newCourses);
    };

    const newDifficulty = (index: number, value: string) => {
        setDifficulty({...difficulty, [index]: value});
    };

    const newExam = (index: number, examIndex: number, value: Date | null) => {
        setExams(prevExams => {
            const updatedExams = { ...prevExams };
            if (!updatedExams[index]) {
                updatedExams[index] = [];
            }
            updatedExams[index][examIndex] = value;
            return updatedExams;
        });
    };

    const addExam = (index: number) => {
        setExams(prevExams => ({
            ...prevExams,
            [index]: [...(prevExams[index] || []), null] // Ensure it starts as null
        }));
    };

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
                        <DayPilotCalendar
                            {...config}
                            onTimeRangeSelected={onTimeRangeSelected}
                            contextMenu={contextMenu}
                            onBeforeEventRender={onBeforeEventRender}
                            controlRef={setCalendar}
                        />
                        <br /><br />
            <label>How many classes are you taking? &nbsp;</label>
            <Dropdown value={selectedClassNum} onChange={(e) => setSelectedClassNum(e.value)} options={numClasses} optionLabel="name" placeholder="Select Number of Classes" className="custom-dropdown" panelStyle={{backgroundColor: 'white' }}/>
            <br /><br />
            {courses.map((courses, index) => (
                <div key={index}>
                    <span>Course Name: &nbsp;</span>
                    <InputText value={courses} onChange={(e) => newCourse(index, e.target.value)} placeholder= "Enter Course" className = "custom-input" />
                    &nbsp; Difficulty: &nbsp;
                    <Dropdown value={difficulty[index]} onChange = {(e) => newDifficulty(index, e.value)} options={difficultyLevels} optionLabel="name" placeholder="Select Difficulty" className="custom-dropdown" panelStyle={{backgroundColor: 'white' }}/>
                    <br /><br />
                    <div className="exam-container">
                    <span>Exam Dates for {courses}: </span>
                    {exams[index]?.map((date, examIndex) => (
                            <div key={examIndex}>
                            <Calendar
                                value={date} // Ensures correct Date type
                                onChange={(e) => newExam(index, examIndex, e.value as Date | null)}
                                showTime
                                hourFormat="24"
                                className="custom-input"
                            />
                        </div>
                        ))}
                    <Button label="Add New Exam" onClick={() => addExam(index)} className ='custom-button' />
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