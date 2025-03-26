'use client';

import React, { useEffect, useState } from 'react';
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-react';
import LogoutButton from './LogoutButton';
import jsPDF from 'jspdf';

export default function Calendar() {
  const [calendar, setCalendar] = useState(null);
  const [startDate, setStartDate] = useState(DayPilot.Date.today().firstDayOfWeek());
  const [showPrev, setShowPrev] = useState(false);

  // Configuration for the calendar view
  const [config] = useState({
    viewType: 'Week',
    durationBarVisible: false,
  });

  // Determine start hour based on availability
  const generateStartHour = (availability, fallbackHour) => {
    switch (availability) {
      case 'Mornings (before 2PM)':
        return 9;
      case 'Evenings (after 5PM)':
        return 18;
      case 'Weekdays':
        return fallbackHour;
      case 'Anytime':
      default:
        return fallbackHour;
    }
  };

  // Handle editing a calendar event (study session)
  const editEvent = async (e) => {
    const form = [
      {
        name: 'Edit Study Session',
        id: 'header',
        type: 'html',
        html: '<h2 style="text-align:center; margin-top:0; color:black; text-shadow:1px 1px 2px gray;">Edit Study Session</h2>'
      },
      { name: 'Event text', id: 'text', type: 'text' },
      {
        name: 'Color',
        id: 'backColor',
        type: 'select',
        options: [
          { name: 'Blue', id: '#56c5ff' },
          { name: 'Green', id: '#6aa84f' },
          { name: 'Red', id: '#cc4125' },
          { name: 'Purple', id: '#af8ee5' },
        ],
        placeholder: "Ex: 'Blue'"
      }
    ];

    const modal = await DayPilot.Modal.form(form, e.data);
    if (modal.canceled) return;

    e.data.text = modal.result.text;
    e.data.backColor = modal.result.backColor;
    calendar?.events.update(e);
  };

  // Context menu (right-click) options
  const contextMenu = new DayPilot.Menu({
    items: [
      {
        text: 'Delete',
        onClick: async (args) => {
          calendar?.events.remove(args.source);
        },
      },
      { text: '-' },
      {
        text: 'Edit...',
        onClick: async (args) => {
          await editEvent(args.source);
        },
      },
    ],
  });

  // Event render customization
  const onBeforeEventRender = (args) => {
    args.data.areas = [
      {
        top: 5,
        right: 5,
        width: 20,
        height: 20,
        symbol: 'icons/daypilot.svg#minichevron-down-2',
        fontColor: '#fff',
        backColor: '#00000033',
        style: 'border-radius: 25%; cursor: pointer;',
        toolTip: 'Show context menu',
        action: 'ContextMenu',
      },
    ];
  };

  // Update calendar when component mounts or week changes
  useEffect(() => {
    const data = localStorage.getItem('scheduleData');
    if (!data) return;
    const { availability, courses } = JSON.parse(data);

    const events = courses.map((course, index) => {
      const fallbackHour = 15;
      const hour = generateStartHour(availability, fallbackHour);
      const dayOffset = index % 5;
      const start = startDate.addDays(dayOffset).addHours(hour);
      const end = start.addHours(2);

      return {
        start,
        end,
        id: DayPilot.guid(),
        text: `${course.name} - Study`,
        backColor: '#56c5ff',
      };
    });

    if (calendar) {
      calendar.update({ startDate, events });
    }

    setShowPrev(startDate > DayPilot.Date.today().firstDayOfWeek());
  }, [calendar, startDate]);

  // Export calendar to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Your Study Schedule', 20, 20);

    const events = calendar?.events.list || [];
    let y = 30;
    events.forEach((event) => {
      const text = `• ${event.data.text} | ${event.data.start.toString("dddd M/d h:mm tt")} - ${event.data.end.toString("h:mm tt")}`;
      doc.setFontSize(12);
      doc.text(text, 20, y);
      y += 10;
    });

    doc.save('study_schedule.pdf');
  };

  const navButtonStyle = {
    width: '150px',
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
  };

  return (
    <div style={{ padding: '40px', minHeight: '100vh', color: 'white', position: 'relative' }}>
      {/* Navigation and Logout */}
      <button
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          cursor: 'pointer',
        }}
        onClick={() => window.location.href = '/dashboard'}
      >
        ← Back to Dashboard
      </button>

      <LogoutButton styleOverride={{ top: '20px', right: '20px' }} />

      {/* Title */}
      <h2 style={{ textAlign: 'center', marginBottom: '20px', textShadow: '1px 1px 4px black' }}>
        🧠 Your Generated Schedule
      </h2>

      {/* Week navigation buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {showPrev && (
          <button
            onClick={() => setStartDate(startDate.addDays(-7))}
            style={navButtonStyle}
          >
            ⏮️ Prev
          </button>
        )}

        <button
          onClick={() => setStartDate(startDate.addDays(7))}
          style={navButtonStyle}
        >
           Next ⏭️
        </button>
      </div>

      {/* Calendar UI */}
      <DayPilotCalendar
        {...config}
        startDate={startDate}
        controlRef={setCalendar}
        contextMenu={contextMenu}
        onBeforeEventRender={onBeforeEventRender}
        onTimeRangeSelected={async (args) => {
          const modal = await DayPilot.Modal.prompt("Create a new study block:", "Ex: 'Math Review'");
          calendar?.clearSelection();
          if (modal.canceled) return;
          calendar?.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result,
          });
        }}
        onEventClick={async (args) => {
          await editEvent(args.e);
        }}
        onEventMove={(args) => {
          args.e.data.start = args.newStart;
          args.e.data.end = args.newEnd;
          calendar.events.update(args.e);
        }}
        onEventResize={(args) => {
          args.e.data.start = args.newStart;
          args.e.data.end = args.newEnd;
          calendar.events.update(args.e);
        }}
      />

      {/* Export Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          onClick={handleExportPDF}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}
