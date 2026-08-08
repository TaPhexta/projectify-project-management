import { useState } from "react";

import "./Projects.css";

import ProjectCard from "../../components/common/ProjectCard/ProjectCard";
import Button from "../../components/ui/Button/Button";

import useProjectModal from "../../hooks/useProjectModal";
import useProjects from "../../hooks/useProjects";
import useProjectSearch from "../../hooks/useProjectSearch";

function Projects() {
  // Local filter for filtering projects by their status.
  const [statusFilter, setStatusFilter] = useState("All");

  // Get the project data/actions we need.
  const { projects, handleDeleteProject, handleEditProject } = useProjects();

  // Get the global search text from the topbar.
  const { searchQuery } = useProjectSearch();

  // Get the function that opens the project modal.
  const { handleOpenProjectModal } = useProjectModal();

  // Apply both the global search and status filter.
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="page">
      <div className="page-header">
        <h1>Projects</h1>
        <p>Manage all your projects in one place.</p>
      </div>

      {/* Opens the project form inside the modal. */}
      <div className="projects-actions">
        <Button onClick={handleOpenProjectModal}>+ New Project</Button>
      </div>

      {/* Filter projects by status. */}
      <div className="projects-filters">
        <label htmlFor="statusFilter">Status</label>

        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Show this when there are no projects at all. */}
      {projects.length === 0 && (
        <p>No projects yet. Create your first project.</p>
      )}

      {/* Display the filtered projects. */}
      {projects.length > 0 && (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDeleteProject}
              onEdit={handleEditProject}
            />
          ))}
        </div>
      )}

      {/* The ProjectModal should be rendered globally,
          preferably in your main layout, rather than here. */}
    </section>
  );
}

export default Projects;
