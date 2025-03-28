'use client';

import React, {useEffect, useState} from "react";
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
//import "./DashboardCSS.css";
import FallingLeaves from "./FallingLeaves";
import { Link } from 'react-router-dom';

export default function Calendar() {
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

    const urgency = [
        {name: "1", id: 1},
        {name: "2", id: 2},
        {name: "3", id: 3},
        {name: "4", id: 4},
    ];

    const [calendar, setCalendar] = React.useState<DayPilot.Calendar>();
    const [startDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    const editEvent = async (e: DayPilot.Event) => {
        const form = [
            {name: "Event text", id: "text", type: "text"},
            {name: "Event color", id: "backColor", type: "select", options: colors},
            {name: "Level of Help", id: "tags.urgency", type: "select", options: urgency},
        ];

        const modal = await DayPilot.Modal.form(form, e.data);
        if (modal.canceled) { return; }
        e.data.text = modal.result.text;
        e.data.backColor = modal.result.backColor;
        e.data.tags.urgency = modal.result.tags.urgency;
        calendar?.events.update(e);
    };

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
            tags: {
                urgency: 1,
            }
        });
    };


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
            <Link to = "/">
        <button type="button" id="logoutButton" className="custom-button"> Log Out </button></Link>
        </div>
    )
}