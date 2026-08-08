import { useEffect, useState } from "react";

import "./ProjectForm.css";

import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import "../../../components/ui/Input/Input.css";

import useProjectModal from "../../../hooks/useProjectModal";
import useProjects from "../../../hooks/useProjects";

function ProjectForm() {
  // Get the project information and CRUD functions from ProjectContext.
  const { editingProject, handleCreateProject, handleUpdateProject } =
    useProjects();

  // Get information specifically related to the project modal.
  // projectFormDueDate allows the calendar to tell this form which
  // date the user clicked when creating a project.
  const { projectFormDueDate, handleCloseProjectModal } = useProjectModal();

  // This is the information currently typed/selected in the form.
  const [formData, setFormData] = useState({
    title: editingProject?.title ?? "",
    description: editingProject?.description ?? "",
    status: editingProject?.status ?? "Planning",
    dueDate: editingProject?.dueDate ?? projectFormDueDate ?? "",
  });

  // Stores validation errors for individual fields.
  const [errors, setErrors] = useState({});

  // Runs whenever the user changes an input.
  function handleChange(event) {
    const { name, value } = event.target;

    // Update only the field that changed.
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove the error for that field once the user starts correcting it.
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  // Check whether the form contains valid information.
  function validateForm() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Project title is required.";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Project title must be at least 3 characters.";
    } else if (formData.title.trim().length > 50) {
      newErrors.title = "Project title cannot exceed 50 characters.";
    }

    if (formData.description.length > 300) {
      newErrors.description = "Description cannot exceed 300 characters.";
    }

    setErrors(newErrors);

    // No errors means the form is valid.
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Don't save anything if validation fails.
    if (!validateForm()) {
      return;
    }

    // Build the project object that will be stored in Context/localStorage.
    const projectData = {
      ...formData,

      title: formData.title.trim(),
      description: formData.description.trim(),

      // Existing project = keep its ID.
      // New project = generate a new ID.
      id: editingProject ? editingProject.id : crypto.randomUUID(),

      // Existing project = keep its creation date.
      // New project = record the current date.
      createdAt: editingProject
        ? editingProject.createdAt
        : new Date().toISOString(),
    };

    // Decide whether this is an update or a new project.
    if (editingProject) {
      handleUpdateProject(projectData);
    } else {
      handleCreateProject(projectData);
    }

    // Clear the form after saving.
    setFormData({
      title: "",
      description: "",
      status: "Planning",
      dueDate: "",
    });

    setErrors({});

    // Close the modal after the project has been saved.
    handleCloseProjectModal();
  }

  useEffect(() => {
    // If we're editing an existing project,
    // load that project's information into the form.
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        description: editingProject.description,
        status: editingProject.status,
        dueDate: editingProject.dueDate,
      });
    } else {
      // Otherwise we're creating a new project.
      // If the calendar supplied a date, use that date automatically.
      setFormData({
        title: "",
        description: "",
        status: "Planning",
        dueDate: projectFormDueDate || "",
      });
    }

    // Clear old validation errors whenever the project being edited
    // or the date being supplied changes.
    setErrors({});
  }, [editingProject, projectFormDueDate]);

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <Input
        label="Project Title"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
      />

      <Input
        label="Description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
      />

      <Input
        label="Due Date"
        name="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <Input
        label="Status"
        name="status"
        type="select"
        value={formData.status}
        onChange={handleChange}
        options={["Planning", "In Progress", "Completed"]}
      />

      <Button type="submit">
        {editingProject ? "Save Changes" : "Create Project"}
      </Button>
    </form>
  );
}

export default ProjectForm;
