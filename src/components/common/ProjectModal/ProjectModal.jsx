import useProjectModal from "../../../hooks/useProjectModal";

import ProjectForm from "../ProjectForm/ProjectForm";

import "./ProjectModal.css";

function ProjectModal() {
  const { isProjectModalOpen, handleCloseProjectModal } = useProjectModal();

  // Don't render the modal when it isn't open.
  if (!isProjectModalOpen) {
    return null;
  }

  return (
    <div className="project-modal-overlay" onClick={handleCloseProjectModal}>
      <div
        className="project-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="project-modal-header">
          <h2>Project</h2>

          <button type="button" onClick={handleCloseProjectModal}>
            ×
          </button>
        </div>

        <ProjectForm />
      </div>
    </div>
  );
}

export default ProjectModal;
