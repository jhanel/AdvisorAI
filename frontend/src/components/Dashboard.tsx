'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

export default function Dashboard() {
  const navigate = useNavigate();

  const [availability, setAvailability] = useState('');
  const [numCourses, setNumCourses] = useState(0);
  const [courses, setCourses] = useState([]);

  const handleCourseChange = (index, field, value) => {
    const updated = [...courses];
    updated[index] = { ...updated[index], [field]: value };
    setCourses(updated);
  };

  const handleGenerateSchedule = () => {
    const scheduleInputData = {
      availability,
      numCourses,
      courses,
    };

    localStorage.setItem('scheduleData', JSON.stringify(scheduleInputData));
    navigate('/calendar');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
        color: 'white',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Advisor AI</h1>
        <LogoutButton styleOverride={{ top: '150px', right: '-300px' }} />

        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span role="img" aria-label="brain">🧠</span> Schedule Generator
        </h2>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>
            What is your availability?
          </label>
          <textarea
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="Ex: Weekdays after 4PM, weekends anytime"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#2a2a2a',
              color: 'white',
              border: '1px solid #444',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>
            How many courses are you taking?
          </label>
          <input
            type="number"
            min="0"
            value={numCourses}
            onChange={(e) => {
              const count = parseInt(e.target.value) || 0;
              setNumCourses(count);
              setCourses(Array(count).fill({ name: '', difficulty: '', exam: false, quiz: false, assignment: false, dueDates: {} }));
            }}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#2a2a2a',
              color: 'white',
              border: '1px solid #444',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {courses.map((course, index) => (
          <div key={index} style={{
            border: '1px solid #444',
            padding: '15px',
            borderRadius: '6px',
            marginBottom: '20px',
            backgroundColor: '#1a1a1a'
          }}>
            <h4>Course {index + 1}</h4>
            <input
              type="text"
              placeholder="Course Name"
              value={course.name}
              onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
            />
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Difficulty (1–5)"
              value={course.difficulty}
              onChange={(e) => handleCourseChange(index, 'difficulty', e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
            />

            {['exam', 'quiz', 'assignment'].map((type) => (
              <div key={type} style={{ marginBottom: '10px' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={course[type]}
                    onChange={(e) => handleCourseChange(index, type, e.target.checked)}
                  />{' '}{type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
                {course[type] && (
                  <div style={{ marginTop: '5px' }}>
                    <label>Due Date: </label>
                    <input
                      type="date"
                      value={course.dueDates?.[type] || ''}
                      onChange={(e) => {
                        const updatedDueDates = {
                          ...course.dueDates,
                          [type]: e.target.value
                        };
                        handleCourseChange(index, 'dueDates', updatedDueDates);
                      }}
                      style={{ padding: '6px', marginLeft: '10px', boxSizing: 'border-box' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleGenerateSchedule}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Generate Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
