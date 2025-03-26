'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

export default function Dashboard() {
  const navigate = useNavigate();

  // State for availability input, course count, and course details
  const [availability, setAvailability] = useState('');
  const [numCourses, setNumCourses] = useState(0);
  const [courses, setCourses] = useState([]);

  // Handles updates to each course's field (name, difficulty, etc.)
  const handleCourseChange = (index, field, value) => {
    const updated = [...courses];
    updated[index] = { ...updated[index], [field]: value };
    setCourses(updated);
  };

  // Stores schedule data and navigates to calendar
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
    // Centered frosted glass container over background
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          color: 'white',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          padding: '40px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        {/* Title and Logout */}
        <div style={{ textAlign: 'center', marginBottom: '10px', textShadow: '1px 1px 4px black' }}>
          <h1>Advisor AI</h1>
        </div>
        <LogoutButton styleOverride={{ top: '5px', right: '-300px' }} />

        {/* Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: '30px', textShadow: '1px 1px 4px black' }}>
          <h2><span role="img" aria-label="brain">🧠</span> Schedule Generator</h2>
        </div>

        {/* Availability input */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px', textShadow: '1px 1px 4px black' }}>
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

        {/* Number of courses input */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px', textShadow: '1px 1px 4px black' }}>
            How many courses are you taking?
          </label>
          <input
            type="number"
            min="0"
            value={numCourses}
            onChange={(e) => {
              const count = parseInt(e.target.value) || 0;
              setNumCourses(count);
              setCourses(Array(count).fill({ name: '', difficulty: '', exam: false, dueDates: {} }));
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

        {/* Render dynamic course inputs */}
        {courses.map((course, index) => (
          <div key={index} style={{
            border: '1px solid #444',
            padding: '15px',
            borderRadius: '6px',
            marginBottom: '20px',
            backgroundColor: '#1a1a1a'
          }}>
            <h4 style={{ textShadow: '1px 1px 4px black' }}>Course {index + 1}</h4>

            {/* Course name */}
            <input
              type="text"
              placeholder="Course Name"
              value={course.name}
              onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
            />

            {/* Course difficulty */}
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Difficulty (1–5)"
              value={course.difficulty}
              onChange={(e) => handleCourseChange(index, 'difficulty', e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
            />

            {/* Exam checkbox and due date */}
            <div style={{ marginBottom: '10px' }}>
              <label style={{ textShadow: '1px 1px 4px black' }}>
                <input
                  type="checkbox"
                  checked={course.exam}
                  onChange={(e) => handleCourseChange(index, 'exam', e.target.checked)}
                />{' '}Exam
              </label>
              {course.exam && (
                <div style={{ marginTop: '5px' }}>
                  <label style={{ textShadow: '1px 1px 4px black' }}>Due Date: </label>
                  <input
                    type="date"
                    value={course.dueDates?.exam || ''}
                    onChange={(e) => {
                      const updatedDueDates = {
                        ...course.dueDates,
                        exam: e.target.value
                      };
                      handleCourseChange(index, 'dueDates', updatedDueDates);
                    }}
                    style={{ padding: '6px', marginLeft: '10px', boxSizing: 'border-box' }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Generate schedule button */}
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
