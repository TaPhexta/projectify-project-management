import { useEffect, useState } from "react";

import "./Projects.css";

import ProjectCard from "../../components/common/ProjectCard/ProjectCard";
import ProjectForm from "../../components/common/ProjectForm/ProjectForm";
import Input from "../../components/ui/Input/Input";

function Projects() {
  const STORAGE_KEY = "projectify-projects";
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem(STORAGE_KEY);

    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  function handleCreateProject(project) {
    setProjects((prevProjects) => [...prevProjects, project]);
  }

  function handleDeleteProject(projectId) {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId),
    );
  }

  function handleUpdateProject(updatedProject) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    );
    setEditingProject(null);
  }

  function handleEditProject(project) {
    setEditingProject(project);
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

      <div className="projects-search">
        <Input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search projects"
        />
      </div>

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

      <ProjectForm
        key={editingProject?.id ?? "new"}
        project={editingProject}
        onCreateProject={handleCreateProject}
        onUpdateProject={handleUpdateProject}
      />

      {projects.length === 0 && (
        <p>No projects yet. Create your first project.</p>
      )}

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
    </section>
  );
}

export default Projects;
