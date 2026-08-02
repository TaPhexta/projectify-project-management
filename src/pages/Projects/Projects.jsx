import { useState } from "react";

import "./Projects.css";

import ProjectCard from "../../components/common/ProjectCard/ProjectCard";
import ProjectForm from "../../components/common/ProjectForm/ProjectForm";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

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

  return (
    <section className="page">
      <div className="page-header">
        <h1>Projects</h1>
        <p>Manage all your projects in one place.</p>
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
          {projects.map((project) => (
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
