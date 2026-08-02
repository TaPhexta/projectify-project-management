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
  }

  function handleSubmit(event) {
    event.preventDefault();

    const projectData = {
      ...formData,
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
  }

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        status: project.status,
        dueDate: project.dueDate,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "Planning",
        dueDate: "",
      });
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
      />

      <Input
        label="Description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
      />

      <Input
        label="Due Date"
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
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
