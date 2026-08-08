import { useMemo } from "react";

import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";

import useProjects from "../../hooks/useProjects";
import useProjectModal from "../../hooks/useProjectModal";

import "./Dashboard.css";

function Dashboard() {
  // Get the real project data from our global project state.
  const { projects } = useProjects();

  // Get the function that opens our global project modal.
  const { handleOpenProjectModal } = useProjectModal();

  const dashboardData = useMemo(() => {
    // Get today's date.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Count projects by status.
    const planning = projects.filter(
      (project) => project.status === "Planning",
    ).length;

    const inProgress = projects.filter(
      (project) => project.status === "In Progress",
    ).length;

    const completed = projects.filter(
      (project) => project.status === "Completed",
    ).length;

    // Projects that aren't completed are considered active.
    const active = projects.filter(
      (project) => project.status !== "Completed",
    ).length;

    // Find projects whose due date has already passed.
    const overdue = projects.filter((project) => {
      if (!project.dueDate || project.status === "Completed") {
        return false;
      }

      const dueDate = new Date(project.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      return dueDate < today;
    });

    // Find projects due within the next 7 days.
    const dueSoon = projects.filter((project) => {
      if (!project.dueDate || project.status === "Completed") {
        return false;
      }

      const dueDate = new Date(project.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      const difference = dueDate.getTime() - today.getTime();

      const daysUntilDue = difference / (1000 * 60 * 60 * 24);

      return daysUntilDue >= 0 && daysUntilDue <= 7;
    });

    // Work out the percentage of projects completed.
    const completionRate =
      projects.length > 0 ? Math.round((completed / projects.length) * 100) : 0;

    // Get the next upcoming deadlines.
    const upcomingProjects = projects
      .filter((project) => project.dueDate && project.status !== "Completed")
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

    return {
      planning,
      inProgress,
      completed,
      active,
      overdue,
      dueSoon,
      completionRate,
      upcomingProjects,
    };
  }, [projects]);

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Here's an overview of your projects and upcoming deadlines.</p>
        </div>

        <Button onClick={handleOpenProjectModal}>+ New Project</Button>
      </div>

      {/* Main project statistics */}
      <div className="dashboard-grid">
        <Card title="Total Projects">
          <h2>{projects.length}</h2>
          <p>All projects</p>
        </Card>

        <Card title="Active Projects">
          <h2>{dashboardData.active}</h2>
          <p>Planning or in progress</p>
        </Card>

        <Card title="Completed">
          <h2>{dashboardData.completed}</h2>
          <p>{dashboardData.completionRate}% completion rate</p>
        </Card>

        <Card title="Overdue">
          <h2>{dashboardData.overdue.length}</h2>
          <p>Require attention</p>
        </Card>
      </div>

      {/* Deadline warning */}
      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Attention</h2>
            <p>Projects that may need your attention.</p>
          </div>
        </div>

        <div className="dashboard-attention">
          <div className="dashboard-alert">
            <strong>{dashboardData.overdue.length}</strong>

            <span>Overdue projects</span>
          </div>

          <div className="dashboard-alert">
            <strong>{dashboardData.dueSoon.length}</strong>

            <span>Due within 7 days</span>
          </div>
        </div>
      </section>

      {/* Status overview */}
      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Project Status</h2>
            <p>Current distribution of your projects.</p>
          </div>
        </div>

        <div className="dashboard-status">
          <div>
            <span>Planning</span>
            <strong>{dashboardData.planning}</strong>
          </div>

          <div>
            <span>In Progress</span>
            <strong>{dashboardData.inProgress}</strong>
          </div>

          <div>
            <span>Completed</span>
            <strong>{dashboardData.completed}</strong>
          </div>
        </div>
      </section>

      {/* Upcoming deadlines */}
      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Upcoming Deadlines</h2>
            <p>Your next project deadlines.</p>
          </div>
        </div>

        {dashboardData.upcomingProjects.length === 0 ? (
          <p className="dashboard-empty">No upcoming deadlines.</p>
        ) : (
          <div className="dashboard-deadlines">
            {dashboardData.upcomingProjects.map((project) => (
              <div className="dashboard-deadline" key={project.id}>
                <div>
                  <strong>{project.title}</strong>

                  <span>{project.status}</span>
                </div>

                <time>
                  {new Date(project.dueDate).toLocaleDateString("en-ZA", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default Dashboard;
