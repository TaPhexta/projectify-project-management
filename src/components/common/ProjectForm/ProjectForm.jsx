import { useEffect, useState } from "react";

import "./ProjectForm.css";

import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import "../../../components/ui/Input/Input.css";

function ProjectForm({ onCreateProject, onUpdateProject, project }) {
  const [formData, setFormData] = useState({
    title: project?.title ?? "",
    description: project?.description ?? "",
    status: project?.status ?? "Planning",
    dueDate: project?.dueDate ?? "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  const [errors, setErrors] = useState({});

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

    return Object.keys(newErrors).length === 0;
  }
  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const projectData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      id: project ? project.id : crypto.randomUUID(),
      createdAt: project ? project.createdAt : new Date().toISOString(),
    };

    if (project) {
      onUpdateProject(projectData);
    } else {
      onCreateProject(projectData);
    }

    setFormData({
      title: "",
      description: "",
      status: "Planning",
      dueDate: "",
    });

    setErrors({});
  }

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        status: project.status,
        dueDate: project.dueDate,
      });
      setErrors({});
    } else {
      setFormData({
        title: "",
        description: "",
        status: "Planning",
        dueDate: "",
      });
      setErrors({});
    }
  }, [project]);

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
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        error={errors.dueDate}
      />

      <Input
        label="Status"
        type="select"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={["Planning", "In Progress", "Completed"]}
      />

      <Button type="submit">
        {project ? "Save Changes" : "Create Project"}
      </Button>
    </form>
  );
}

export default ProjectForm;
