/* eslint-disable react/prop-types */
function SecondaryButton({
  type = "button",
  text,
  icon,
  onClick,
  customClassName,
  customStyle,
  customIconStyle,
  disabled = false,
  active = false,
}) {
  return (
    <button
      type={type}
      className={`btn btn-secondary ${customClassName} ${active ? "btn-secondary-active" : ""}`}
      onClick={onClick}
      style={customStyle}
      disabled={disabled}
    >
      <div>{text}</div>
      <span className="h-10" style={customIconStyle}>
        {icon && <img className="h-full w-auto ml-2" src={icon} />}
      </span>
    </button>
  );
}

export default SecondaryButton;
