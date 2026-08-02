import Button from "../../ui/Button/Button";
import Card from "../../ui/Card/Card";

function ProjectCard({ project, onDelete, onEdit }) {
  return (
    <Card title={project.title} subtitle={project.status}>
      <p>{project.description}</p>

      <small>Due: {project.dueDate || "No due date"}</small>

      <Button onClick={() => onEdit(project)}>Edit</Button>

      <Button variant="danger" onClick={() => onDelete(project.id)}>
        Delete
      </Button>
    </Card>
  );
}

export default ProjectCard;
