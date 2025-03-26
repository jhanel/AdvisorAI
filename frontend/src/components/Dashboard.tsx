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

  const availabilityOptions = [
    'Anytime',
    'Mornings',
    'Evenings',
    'Weekdays',
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '40px 20px'
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
          width: '100%'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '10px', textShadow: '1px 1px 4px black' }}>
          <h1>Advisor AI</h1>
        </div>
        <LogoutButton styleOverride={{ top: '5px', right: '-300px' }} />

        <div style={{ textAlign: 'center', marginBottom: '30px', textShadow: '1px 1px 4px black' }}>
          <h2><span role="img" aria-label="brain">🧠</span> Schedule Generator</h2>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px', textShadow: '1px 1px 4px black' }}>
            What is your availability?
          </label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#2a2a2a',
              color: 'white',
              border: '1px solid #444',
              boxSizing: 'border-box'
            }}
          >
            <option value="" disabled>Select your availability</option>
            {availabilityOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

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

        {courses.map((course, index) => (
          <div key={index} style={{
            border: '1px solid #444',
            padding: '15px',
            borderRadius: '6px',
            marginBottom: '20px',
            backgroundColor: '#1a1a1a'
          }}>
            <h4 style={{ textShadow: '1px 1px 4px black' }}>Course {index + 1}</h4>
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
