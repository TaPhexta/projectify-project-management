import { createContext, useEffect, useState } from "react";

const ProjectContext = createContext();

const STORAGE_KEY = "projectify-projects";

function ProjectProvider({ children }) {
  // Global search text used by the topbar.
  const [searchQuery, setSearchQuery] = useState("");

  // Load saved projects when the application starts.
  const [projects, setProjects] = useState(() => {
    try {
      const savedProjects = localStorage.getItem(STORAGE_KEY);

      if (!savedProjects) {
        return [];
      }

      const parsedProjects = JSON.parse(savedProjects);

      // Make sure we actually got an array.
      if (!Array.isArray(parsedProjects)) {
        return [];
      }

      return parsedProjects;
    } catch (error) {
      console.error("Could not load projects from localStorage:", error);

      return [];
    }
  });

  // The project currently being edited.
  // null means we're creating a new project.
  const [editingProject, setEditingProject] = useState(null);

  // Controls whether the project modal is visible.
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Optional date supplied by the calendar.
  const [projectFormDueDate, setProjectFormDueDate] = useState("");

  // Save projects whenever they change.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  // Create a project.
  function handleCreateProject(project) {
    setProjects((prevProjects) => [...prevProjects, project]);
  }

  // Delete a project.
  function handleDeleteProject(projectId) {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId),
    );
  }

  // Update an existing project.
  function handleUpdateProject(updatedProject) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    );

    setEditingProject(null);
  }

  // Open the modal with an existing project for editing.
  function handleEditProject(project) {
    setEditingProject(project);
    setProjectFormDueDate("");
    setIsProjectModalOpen(true);
  }

  // Convert a date into the format expected by
  // an HTML date input: YYYY-MM-DD.
  function formatDateForInput(date) {
    // No date was supplied.
    if (!date) {
      return "";
    }

    // Calendar dates may already be strings such as
    // "2026-08-08", so don't try to treat them as Date objects.
    if (typeof date === "string") {
      return date;
    }

    // If it isn't a Date object, don't try to use
    // Date methods on it.
    if (!(date instanceof Date)) {
      return "";
    }

    // Convert the Date object into YYYY-MM-DD.
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Turn projects into the format react-big-calendar expects.
  const calendarEvents = projects
    .filter((project) => project.dueDate)
    .map((project) => ({
      title: project.title,
      start: new Date(project.dueDate),
      end: new Date(project.dueDate),
      resource: project,
    }));

  // Open the modal for creating a new project.
  //
  // If a date was supplied by the calendar,
  // automatically put that date into the form.
  function handleOpenProjectModal(dueDate = "") {
    setEditingProject(null);

    setProjectFormDueDate(formatDateForInput(dueDate));

    setIsProjectModalOpen(true);
  }

  // Close the modal and reset its temporary state.
  function handleCloseProjectModal() {
    setIsProjectModalOpen(false);
    setEditingProject(null);
    setProjectFormDueDate("");
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        calendarEvents,

        editingProject,

        searchQuery,
        setSearchQuery,

        handleCreateProject,
        handleDeleteProject,
        handleUpdateProject,
        handleEditProject,

        isProjectModalOpen,
        projectFormDueDate,
        handleOpenProjectModal,
        handleCloseProjectModal,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export { ProjectProvider };

export default ProjectContext;
