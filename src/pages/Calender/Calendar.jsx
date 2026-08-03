import { useContext } from "react";
import ProjectContext from "../../context/ProjectContext";

import "./Calendar.css";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";

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
  const { projects, handleEditProject } = useContext(ProjectContext);

  const events = projects
    .filter((project) => project.dueDate)
    .map((project) => ({
      title: project.title,
      start: new Date(project.dueDate),
      end: new Date(project.dueDate),
      resource: project,
    }));

  function eventStyleGetter(event) {
    return {
      style: {
        backgroundColor:
          statusColors[event.resource.status] ?? "#6c63ff",
        borderRadius: "6px",
        border: "none",
        color: "#fff",
      },
    };
  }

  function handleSelectEvent(event) {
    console.log(event.resource);

    handleEditProject(event.resource);
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
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          style={{ height: 700 }}
        />
      </div>
    </section>
  );
}

export default CalendarPage;