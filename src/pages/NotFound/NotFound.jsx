import { Link, useLocation, useNavigate } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section className="not-found-page">
      <div className="not-found-card">
        <span className="error-code">404</span>

        <h1>Page Not Found</h1>

        <p>
          The page
          <code>{location.pathname}</code>
          could not be found.
        </p>

        <p className="error-hint">
          Double-check the URL or return to a known page.
        </p>

        <div className="not-found-actions">
          <button className="secondary-button" onClick={() => navigate(-1)}>
            Go Back
          </button>

          <Link to="/" className="primary-button">
            Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
