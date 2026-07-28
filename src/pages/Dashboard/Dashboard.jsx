import Card from "../../components/ui/Card/Card";
import "./Dashboard.css";

function Dashboard() {
  return (
    <section className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-grid">
        <Card title="Projects">
          <h2>12</h2>
          <p>Active Projects</p>
        </Card>

        <Card title="Tasks">
          <h2>48</h2>
          <p>Open Tasks</p>
        </Card>

        <Card title="Team">
          <h2>8</h2>
          <p>Members</p>
        </Card>

        <Card title="Completed">
          <h2>94%</h2>
          <p>This Month</p>
        </Card>
      </div>
    </section>
  );
}

export default Dashboard;
