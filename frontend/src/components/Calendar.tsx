'use client';

import React, { useEffect, useState } from 'react';
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-react';
import LogoutButton from './LogoutButton';

export default function Calendar() {
  const [calendar, setCalendar] = useState(null);

  const [config, setConfig] = useState({
    viewType: 'Week',
    durationBarVisible: false,
  });

  useEffect(() => {
    const data = localStorage.getItem('scheduleData');
    if (!data || !calendar) return;

    const { courses } = JSON.parse(data);
    if (!courses) return;

    const startOfWeek = DayPilot.Date.today().firstDayOfWeek();

    const events = courses.map((course, index) => {
      const dayOffset = index % 7;
      const start = startOfWeek.addDays(dayOffset).addHours(15); // 3PM
      const end = start.addHours(1);

      return {
        start,
        end,
        id: DayPilot.guid(),
        text: `${course.name} - ${course.hasExam ? 'Exam' : 'Study'}`,
        backColor: course.hasExam ? '#cc4125' : '#56c5ff'
      };
    });

    calendar.update({ events });
  }, [calendar]);

  return (
    
    <div style={{ padding: '40px', position: 'relative' }}>
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
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Advisor AI</h1><LogoutButton />
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
        🧠 Your Generated Schedule
      </h2>
      <DayPilotCalendar
        {...config}
        controlRef={setCalendar}
      />
    </div>
  );
}
