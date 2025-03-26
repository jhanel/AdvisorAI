'use client';

import React, { useEffect, useState } from 'react';
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-react';
import LogoutButton from './LogoutButton';
import jsPDF from 'jspdf';

export default function Calendar() {
  const [calendar, setCalendar] = useState(null);
  const [config] = useState({
    viewType: 'Week',
    durationBarVisible: false,
  });

  // Load schedule data from localStorage and create events on the calendar
  useEffect(() => {
    const data = localStorage.getItem('scheduleData');
    if (!data) return;

    const { courses } = JSON.parse(data);
    const startOfWeek = DayPilot.Date.today().firstDayOfWeek();

    const events = courses.map((course, index) => {
      const dayOffset = index % 7;
      const start = startOfWeek.addDays(dayOffset).addHours(15); // 3PM
      const end = start.addHours(1); // 1 hour session

      return {
        start,
        end,
        id: DayPilot.guid(),
        text: `${course.name} - ${course.exam ? 'Exam' : 'Study'}`,
        backColor: course.exam ? '#cc4125' : '#56c5ff',
      };
    });

    if (calendar) {
      calendar.update({ events });
    }
  }, [calendar]);

  // Export the current schedule as a PDF file
  const handleExportPDF = () => {
    const data = localStorage.getItem('scheduleData');
    if (!data) return;

    const { availability, courses } = JSON.parse(data);
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Your Exam Schedule', 20, 20);

    doc.setFontSize(12);
    doc.text(`Availability: ${availability}`, 20, 30);

    courses.forEach((course, index) => {
      const y = 40 + index * 20;
      const taskType = course.exam ? 'Exam' : 'Study';
      const due = course.dueDates?.exam || 'N/A';

      doc.text(
        `• ${course.name} - ${taskType} | Difficulty: ${course.difficulty} | Due: ${due}`,
        20,
        y
      );
    });

    doc.save('study_schedule.pdf');
  };

  return (
    <div style={{ padding: '40px', minHeight: '100vh', color: 'white', position: 'relative' }}>
      {/* Back to Dashboard Button */}
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
          cursor: 'pointer'
        }}
        onClick={() => window.location.href = '/dashboard'}
      >
        ← Back to Dashboard
      </button>

      {/* Logout Button */}
      <LogoutButton styleOverride={{ top: '20px', right: '20px' }} />

      {/* Page Title */}
      <h2 style={{ textAlign: 'center', marginBottom: '20px', textShadow: '1px 1px 4px black' }}>
        🧠 Your Generated Schedule
      </h2>

      {/* Calendar View */}
      <DayPilotCalendar {...config} controlRef={setCalendar} />

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
