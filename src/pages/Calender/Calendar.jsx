import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useProjectModal from "../../hooks/useProjectModal";
import useProjects from "../../hooks/useProjects";

import "./Calendar.css";

import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";

import { format, getDay, parse, startOfWeek } from "date-fns";

import { enZA } from "date-fns/locale";

const locales = {
  "en-ZA": enZA,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const statusColors = {
  Planning: "#6c63ff",
  "In Progress": "#f59e0b",
  Completed: "#10b981",
};

function CalendarPage() {
  // Get the calendar events and project editing function.
  const { calendarEvents, handleEditProject } = useProjects();

  // Used when an existing project is clicked.
  const navigate = useNavigate();

  // Controls which date the calendar is currently displaying.
  const [currentDate, setCurrentDate] = useState(new Date());

  // Controls whether we're looking at month, week, day or agenda.
  const [currentView, setCurrentView] = useState(Views.MONTH);

  // The date currently selected in the calendar popup.
  const [selectedDate, setSelectedDate] = useState(null);

  // Projects that are due on the selected date.
  const [selectedProjects, setSelectedProjects] = useState([]);

  // Gives us access to opening the global Project Modal.
  const { handleOpenProjectModal } = useProjectModal();

  // When an existing project is clicked,
  // select it for editing and go to the Projects page.
  function handleSelectEvent(event) {
    handleEditProject(event.resource);

    navigate("/projects");
  }

  // Give calendar events different colours based on project status.
  function eventStyleGetter(event) {
    return {
      style: {
        backgroundColor: statusColors[event.resource.status] ?? "#6c63ff",

        borderRadius: "6px",
        border: "none",
        color: "#fff",
      },
    };
  }

  // Runs when the user clicks an empty date/calendar slot.
  function handleSelectSlot(slotInfo) {
    // Find all projects whose due date matches the clicked date.
    const projectsForDay = calendarEvents.filter((event) => {
      return event.start.toDateString() === slotInfo.start.toDateString();
    });

    // Open the popup for that date.
    setSelectedDate(slotInfo.start);

    // Give the popup the projects found for that date.
    setSelectedProjects(projectsForDay);
  }

  // Allow Escape to close the popup.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedDate(null);
        setSelectedProjects([]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the keyboard listener when the page disappears.
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close the popup and clear its data.
  function closeCalendarPopup() {
    setSelectedDate(null);
    setSelectedProjects([]);
  }

  return (
    <section className="page">
      <div className="page-header">
        <h1>Calendar</h1>
        <p>Track project deadlines.</p>
      </div>

      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          // Projects displayed on the calendar.
          events={calendarEvents}
          // Allows us to control the current calendar date.
          date={currentDate}
          // Allows us to control the current calendar view.
          view={currentView}
          // Called when the user presses Previous, Next or Today.
          onNavigate={setCurrentDate}
          // Called when the user switches Month/Week/Day/Agenda.
          onView={setCurrentView}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          // Clicking an existing project.
          onSelectEvent={handleSelectEvent}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          style={{ height: 700 }}
          // Allow users to click empty calendar space.
          selectable
          onSelectSlot={handleSelectSlot}
        />

        {/* Only show the popup when a date has been selected. */}
        {selectedDate && (
          <div className="calendar-popup-overlay" onClick={closeCalendarPopup}>
            <div
              className="calendar-popup"
              onClick={(event) => event.stopPropagation()}
            >
              <h2>{format(selectedDate, "EEEE, d MMMM yyyy")}</h2>

              {selectedProjects.length === 0 ? (
                <p>No projects due on this day.</p>
              ) : (
                selectedProjects.map((event) => (
                  <div
                    key={event.resource.id}
                    className="calendar-project-card"
                  >
                    <div>
                      <h4>{event.title}</h4>

                      <span
                        className={`calendar-status ${event.resource.status
                          .toLowerCase()
                          .replace(/\s/g, "-")}`}
                      >
                        {event.resource.status}
                      </span>
                    </div>

                    {/* Edit this specific project. */}
                    <button onClick={() => handleSelectEvent(event)}>
                      Edit
                    </button>
                  </div>
                ))
              )}

              {/* Create a new project using the selected calendar date. */}
              <button
                className="calendar-create-button"
                onClick={() => {
                  handleOpenProjectModal(selectedDate);
                  closeCalendarPopup();
                }}
              >
                + New Project
              </button>

              {/* Close the popup. */}
              <button onClick={closeCalendarPopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CalendarPage;
