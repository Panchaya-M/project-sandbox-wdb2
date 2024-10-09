/* eslint-disable react/prop-types */
function Button({ type = "button", text, icon, className, onClick }) {
  return (
    <button
      type={type}
      className={`btn ${className} ${icon ? "gap-2" : ""}`}
      onClick={onClick}
    >
      {text}
      <span className="h-10">
        {icon && <img className="h-full w-auto" src={icon} />}
      </span>
    </button>
  );
}

export default Button;
