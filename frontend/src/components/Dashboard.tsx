'use client';

import React, {useEffect, useState} from "react";
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";

export default function Calendar() {

    const styles = {
        wrap: {
            display: "flex"
        },
        left: {
            marginRight: "10px"
        },
        main: {
            flexGrow: "1"
        }
    };

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

    const [calendar, setCalendar] = useState<DayPilot.Calendar>();

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
                width: 24,
                height: 24,
                action: "None",
                backColor: "#00000033",
                fontColor: "#fff",
                text: urgency,
                style: "border-radius: 50%; border: 2px solid #fff; font-size: 18px; text-align: center;",
            });
        }
    };

    const initialConfig: DayPilot.CalendarConfig = {
        viewType: "Week",
        durationBarVisible: false,
    };

    const [config, setConfig] = useState(initialConfig);

    useEffect(() => {

        if (!calendar || calendar?.disposed()) {
            return;
        }
        

        const startDate = "2025-10-01";

    }, [calendar]);

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

    function doLogout(event:any) : void
    {
        event.preventDefault();
        alert('doLogout');
    };

    function doNextWeek(event:any) : void
    {
        event.preventDefault();
        alert('doNextWeek');
    };

    return (
        <div>
            <br />
        <button type="button" id="logoutButton" className="buttons" onClick={doNextWeek}> Next </button>
        <br />
        <br />
            <DayPilotCalendar
                {...config}
                onTimeRangeSelected={onTimeRangeSelected}
                onEventClick={async args => { await editEvent(args.e); }}
                contextMenu={contextMenu}
                onBeforeEventRender={onBeforeEventRender}
                controlRef={setCalendar}
            />
            <br />
        <button type="button" id="logoutButton" className="buttons" onClick={doLogout}> Log Out </button>
        </div>
    )
}