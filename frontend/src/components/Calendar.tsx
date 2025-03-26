'use client';

import React, { useEffect, useState } from 'react';
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-react';
import LogoutButton from './LogoutButton';
import jsPDF from 'jspdf';

export default function Calendar() {
  const [calendar, setCalendar] = useState(null);
  const initialStartDate = DayPilot.Date.today().firstDayOfWeek();
  const [startDate, setStartDate] = useState(initialStartDate);
  const [showPrev, setShowPrev] = useState(false);
  const [config] = useState({
    viewType: 'Week',
    durationBarVisible: false,
  });

  useEffect(() => {
    const data = localStorage.getItem('scheduleData');
    if (!data) return;

    const { courses } = JSON.parse(data);

    const events = courses.map((course, index) => {
      const dayOffset = index % 7;
      const start = startDate.addDays(dayOffset).addHours(15);
      const end = start.addHours(1);

      return {
        start,
        end,
        id: DayPilot.guid(),
        text: `${course.name} - Exam`,
        backColor: '#cc4125',
      };
    });

    if (calendar) {
      calendar.update({ startDate, events });
    }

    setShowPrev(startDate > initialStartDate);
  }, [calendar, startDate]);

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
      const due = course.dueDates?.exam || 'N/A';
      doc.text(
        `• ${course.name} - Exam | Difficulty: ${course.difficulty} | Due: ${due}`,
        20,
        y
      );
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
    textAlign: 'center'
  };

  return (
    <div style={{ padding: '40px', minHeight: '100vh', color: 'white', position: 'relative' }}>
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

      <LogoutButton styleOverride={{ top: '20px', right: '20px' }} />

      <h2 style={{ textAlign: 'center', marginBottom: '20px', textShadow: '1px 1px 4px black' }}>
        🧠 Your Generated Schedule
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {showPrev && (
          <button
            onClick={() => {
              const prevWeek = startDate.addDays(-7);
              setStartDate(prevWeek);
            }}
            style={navButtonStyle}
          >
            ⏮️ Prev
          </button>
        )}

        <button
          onClick={() => {
            const nextWeek = startDate.addDays(7);
            setStartDate(nextWeek);
          }}
          style={navButtonStyle}
        >
            Next ⏭️
        </button>
      </div>

      <DayPilotCalendar {...config} startDate={startDate} controlRef={setCalendar} />

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
