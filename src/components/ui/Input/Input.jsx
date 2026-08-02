import "./Input.css";

function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  id,
  disabled = false,
  error = "",
}) {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`input ${error ? "input-error" : ""}`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`input ${error ? "input-error" : ""}`}
        />
      )}

      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
}

export default Input;
