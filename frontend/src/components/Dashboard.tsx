'use client';

import React, {useEffect, useState} from "react";
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
//import "./DashboardCSS.css";
import FallingLeaves from "./FallingLeaves";
import { Link } from 'react-router-dom';

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

//for calendar updates
interface Session {
    start_time: string;
    end_time: string;
    course: string;
    _id: string;
  }
  
  interface GeneratedSchedule {
    [day: string]: Session[];
  }

export default function Calendar() {
    const [message ,setMessage] = React.useState('');
    
    const colors = [
        {name: "Green", id: "#6aa84f"},
        {name: "Blue", id: "#3d85c6"},
        {name: "Turquoise", id: "#00aba9"},
        {name: "Light Blue", id: "#56c5ff"},
        {name: "Yellow", id: "#f1c232"},
        {name: "Orange", id: "#e69138"},
        {name: "Red", id: "#cc4125"},
        {name: "Light Red", id: "#ff0000"},
        {name: "Purple", id: "#af8ee5"},
    ];

    // const urgency = [
    //     {name: "1", id: 1},
    //     {name: "2", id: 2},
    //     {name: "3", id: 3},
    //     {name: "4", id: 4},
    // ];

    const [calendar, setCalendar] = useState<DayPilot.Calendar | null>(null);
    
    const [startDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    const editEvent = async (e: DayPilot.Event) => {
        const form = [
            {name: "Event text", id: "text", type: "text"},
            {name: "Event color", id: "backColor", type: "select", options: colors},
            //{name: "Level of Help", id: "tags.urgency", type: "select", options: urgency},
        ];

        const modal = await DayPilot.Modal.form(form, e.data);
        if (modal.canceled) { return; }
        e.data.text = modal.result.text;
        e.data.backColor = modal.result.backColor;
        //e.data.tags.urgency = modal.result.tags.urgency;
        calendar?.events.update(e);
    };

    const contextMenu = new DayPilot.Menu({
        items: [
            {
                text: "Delete",
                onClick: async args => {
                    //calendar?.events.remove(args.source);
                    const confirmDelete = window.confirm("Are you sure you want to delete?");
                if (confirmDelete) {
                    calendar?.events.remove(args.source);
                }
                },
            },
            {
                text: "-"
            },
            {
                text: "Edit...",
                onClick: async args => {
                    await editEvent(args.source);
                }
            }
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


        const urgency = args.data.tags?.urgency || 0;
        if (urgency > 0) {
            args.data.areas.push({
                bottom: 5,
                left: 5,
                right: 5,
                height: 18,
                action: "None",
                backColor: "#00000033",
                fontColor: "#fff",
                text: urgency,
                style: "text-align: center; font-size: 16px; line-height: 18px; overflow: hidden; text-overflow: ellipsis; cursor: default;",
            });
        }
    };

    const initialConfig: DayPilot.CalendarConfig = {
        viewType: "Week",
        durationBarVisible: false,
        startDate: startDate,
        headerDateFormat: "dddd",
    };

    const [config] = useState(initialConfig);

    useEffect(() => {

        if (!calendar || calendar?.disposed()) {
            return;
        }
        

        calendar.update(config);
    }, [calendar, startDate]);

    const onTimeRangeSelected = async (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
        const modal = await DayPilot.Modal.prompt("Create a new assignment:", "Ex: 'Math Exam'");
        calendar?.clearSelection();
        if (modal.canceled) {
            return;
        }
        // console.log("modal.result", modal.result, calendar);
        calendar?.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result,
            // tags: {
            //     urgency: 1,
            // }
        });
    };

    const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
    const userID = userData.id;

    const genSchedule = async () => {
        try {
            const userId = userID;
            console.log("user id:", userId);
    
            if (!userId) {
                setMessage("User ID is required.");
                return;
            }
    
            setMessage("Generating your study schedule...");
    
            //API to generate the study schedule
            const response = await fetch(buildPath('api/studySchedule/generate-schedule'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });
    
            const res = await response.json();
            console.log("response from api:", res);
    
            if (!response.ok) {
                throw new Error(res.error || 'Failed to generate study schedule.');
            }
    
            console.log("study schedule generated:", res.schedule);
    
            //FIX THIS
            if (res.schedule) {
                updateCalendar(res.schedule);
                console.log("yay! schedule successfully added to calendar!");
            }

        } catch (error) {
            console.error("Error generating study schedule:", error);
            setMessage("Failed to generate study schedule.");
        }
    };
    
    //help
    //assigning color based on course title
    const colorMap = new Map();
    let colorIndex = 0;

    const getColor = (course: string): string => {
        if (!colorMap.has(course)) {
            colorMap.set(course, colors[colorIndex % colors.length].id);
            colorIndex++;
        }
        return colorMap.get(course);
    };


    //should always be this week
    const getStartOfWeek = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const diffToSunday = dayOfWeek;
        const sunday = new Date(today);
        sunday.setDate(today.getDate() - diffToSunday); 
        sunday.setHours(0, 0, 0, 0); 
        return sunday;
      };
    
      // update the calendar with the events from api response
      const updateCalendar = (schedule: { generatedSchedule: GeneratedSchedule }) => {
        if (!schedule || !schedule.generatedSchedule) {
          console.log("Invalid schedule received:", schedule);
          return;
        }
    
        const events: any[] = [];
    
        // get the start of the current week starting on sunday
        const startOfWeek = getStartOfWeek();
    
        Object.entries(schedule.generatedSchedule).forEach(([day, sessions]: [string, Session[]]) => {
          const dayIndex: { [key: string]: number } = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
          };
          const dayOffset = dayIndex[day];
    
          // loop throught he day with correct formatting and splitting
          sessions.forEach((session) => {
            const [startHours, startMinutes] = session.start_time.split(":").map(Number);
            const [endHours, endMinutes] = session.end_time.split(":").map(Number);
    
            const startTime = new Date(startOfWeek);  
            startTime.setDate(startOfWeek.getDate() + dayOffset);
            startTime.setHours(startHours, startMinutes);
    
            const endTime = new Date(startOfWeek);
            endTime.setDate(startOfWeek.getDate() + dayOffset);
            endTime.setHours(endHours, endMinutes);
    
            //add events to array
            events.push({
              start: startTime,
              end: endTime,
              text: session.course,
              id: session._id,
              backColor: getColor(session.course)
            });
          });
        });
    
        console.log("Final events for calendar:", events);
    
        //add events to the daypilot calendar
        if (calendar) {
          events.forEach(event => {
            calendar.events.add(event);
          });
        }
        setMessage("Schedule successfully generated!");
        console.log("im gonna cry again :D");
      };
    
    
    // const getDayOfWeek = (day: string): string => {
    //     const currentDate = new Date();
    //     const currentDay = currentDate.getDay(); 
    //     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //     const dayIndex = daysOfWeek.indexOf(day);
        
    //     const dayDifference = (dayIndex - currentDay + 7) % 7;
        
    //     currentDate.setDate(currentDate.getDate() + dayDifference);
        
    //     return currentDate.toISOString().split("T")[0];
    // };
    
    
    //

    // function doNextWeek(event: any): void {
    //     event.preventDefault();
    //     const nextWeek = new Date(startDate);
    //     nextWeek.setDate(nextWeek.getDate() + 7);
    //     const newStartDate = nextWeek.toISOString().split('T')[0];
    //     setStartDate(newStartDate);
    //     setConfig(prevConfig => ({
    //         ...prevConfig,
    //         startDate: newStartDate,
    //     }));
    // }

    // function doPreviousWeek(event: any): void {
    //     event.preventDefault();
    //     const previousWeek = new Date(startDate);
    //     previousWeek.setDate(previousWeek.getDate() - 7);
    //     const newStartDate = previousWeek.toISOString().split('T')[0];
    //     setStartDate(newStartDate);
    //     setConfig(prevConfig => ({
    //         ...prevConfig,
    //         startDate: newStartDate,
    //     }));
    // }


    //copy bottom into div for prev and next
    // <button type="button" className="custom-button" onClick={doPreviousWeek}> Previous </button> &emsp;
    // <button type="button" className="custom-button" onClick={doNextWeek}> Next </button>

    return (
        <div className = "class-input-container">
            <h2 className = "title">Your Study Plan</h2>
            <br />
            <div className = "background" ></div>
            <FallingLeaves />
                  <DayPilotCalendar
                {...config}
                onTimeRangeSelected={onTimeRangeSelected}
                onEventClick={async args => { await editEvent(args.e); }}
                contextMenu={contextMenu}
                onBeforeEventRender={onBeforeEventRender}
                controlRef={setCalendar}
            />
            <br />
            <span id="resultsMeassage">{message}</span><br/>
                <button id="Generate Schedule" onClick={genSchedule} className="custom-button primary">Generate Schedule</button>
                    <br/><br/>
                    <Link to = '/input'>
                    <button id="Back to Input" className="custom-button primary" >Back to Input</button></Link>
        </div>
    )
}