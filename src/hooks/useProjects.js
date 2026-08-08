import { useContext } from "react";
import ProjectContext from "../context/ProjectContext";

function useProjects() {
  const {
    projects,
    calendarEvents,
    editingProject,
    handleCreateProject,
    handleDeleteProject,
    handleUpdateProject,
    handleEditProject,
  } = useContext(ProjectContext);

  return {
    projects,
    calendarEvents,
    editingProject,
    handleCreateProject,
    handleDeleteProject,
    handleUpdateProject,
    handleEditProject,
  };
}

export default useProjects;
