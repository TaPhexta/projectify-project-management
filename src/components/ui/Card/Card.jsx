import "./Card.css";

function Card({ title, subtitle, children }) {
  return (
    <article className="card">
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}

          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="card-body">{children}</div>
    </article>
  );
}

export default Card;
