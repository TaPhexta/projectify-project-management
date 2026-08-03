import { createContext, useEffect, useState } from "react";

const ProjectContext = createContext();

const STORAGE_KEY = "projectify-projects";

function ProjectProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
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

  return (
    <ProjectContext.Provider
      value={{
        projects,
        editingProject,
        searchQuery,
        setSearchQuery,
        handleCreateProject,
        handleDeleteProject,
        handleUpdateProject,
        handleEditProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export { ProjectProvider };

export default ProjectContext;
