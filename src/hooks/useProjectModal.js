import { useContext } from "react";

import ProjectContext from "../context/ProjectContext";

function useProjectModal() {
  // Get the modal information and functions from our global project context.
  const {
    isProjectModalOpen,
    projectFormDueDate,
    handleOpenProjectModal,
    handleCloseProjectModal,
  } = useContext(ProjectContext);

  // Return only the things pages/components actually need.
  return {
    isProjectModalOpen,
    projectFormDueDate,
    handleOpenProjectModal,
    handleCloseProjectModal,
  };
}

export default useProjectModal;
