import { useEffect, useState } from 'react';
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-react';
import FallingLeaves from './FallingLeaves';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const app_name = 'studentadvisorai.xyz';

function buildPath(route: string): string {
  if (process.env.NODE_ENV !== 'development') {
    return 'http://' + app_name + ':5002/' + route;
  } else {
    return 'http://localhost:5002/' + route;
  }
}

export default function Calendar() {
  const [calendar, setCalendar] = useState<DayPilot.Calendar>();
  const [startDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const [events, setEvents] = useState<any[]>([]);

  const editEvent = async (e: DayPilot.Event) => {
    const form = [
      {
        name: '<div style="text-align:center; font-size:20px; font-weight:bold; color:black; text-shadow:1px 1px 2px gray;">Edit Study Session</div>',
        id: 'header',
        type: 'html'
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
      },
    ];

    const modal = await DayPilot.Modal.form(form, e.data);
    if (modal.canceled) return;
    e.data.text = modal.result.text;
    e.data.backColor = modal.result.backColor;
    calendar?.events.update(e);
  };

  const contextMenu = new DayPilot.Menu({
    items: [
      {
        text: 'Delete',
        onClick: async (args) => {
          const confirmDelete = window.confirm("Are you sure you want to delete this event?");
          if (confirmDelete) {
            calendar?.events.remove(args.source);
          }
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

  const onBeforeEventRender = (args: DayPilot.CalendarBeforeEventRenderArgs) => {
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

  useEffect(() => {
    const fetchSchedule = async () => {
      const storedUserData = localStorage.getItem('user_data');
      if (!storedUserData) return;

      const user = JSON.parse(storedUserData);
      try {
        const response = await fetch(buildPath('api/studySchedule/get-schedule'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userID: user.id })
        });

        const data = await response.json();
        if (data.success && Array.isArray(data.schedule)) {
          setEvents(data.schedule);
          if (calendar) {
            calendar.update({ startDate, events: data.schedule });
          }
        }
      } catch (error) {
        console.error("Error fetching study schedule:", error);
      }
    };

    fetchSchedule();
  }, [calendar, startDate]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Your Study Schedule', 20, 20);

    const list: DayPilot.EventData[] = calendar?.events.list || [];
    let y = 30;
    
    list.forEach((event) => {
        const text = `• ${event.text} | ${event.start.toString("dddd M/d h:mm tt")} - ${event.end.toString("h:mm tt")}`;
        doc.setFontSize(12);
        doc.text(text, 20, y);
        y += 10;
      });        
    

    doc.save('study_schedule.pdf');
  };

  return (
    <div className="class-input-container">
      <div className="background"></div>
      <FallingLeaves />
      <h2 className="title">Your Study Plan</h2>
      <br />
      <DayPilotCalendar
        {...{ startDate, events }}
        viewType="Week"
        durationBarVisible={false}
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
            backColor: '#56c5ff'
          });
        }}
        onEventClick={async (args) => {
          await editEvent(args.e);
        }}
        onEventMove={(args) => {
          args.e.data.start = args.newStart;
          args.e.data.end = args.newEnd;
          calendar?.events.update(args.e);
        }}
        onEventResize={(args) => {
          args.e.data.start = args.newStart;
          args.e.data.end = args.newEnd;
          calendar?.events.update(args.e);
        }}
      />

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

      <br />
      <Link to="/">
        <button type="button" id="logoutButton" className="custom-button">
          Log Out
        </button>
      </Link>
    </div>
  );
}
