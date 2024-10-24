/* eslint-disable react/prop-types */
function Button({
  type = "button",
  text,
  icon,
  customClassName,
  customStyle,
  customIconStyle,
  onClick,
  disabled = false,
  active = false,
}) {
  return (
    <button
      type={type}
      className={`btn btn-primary ${customClassName} ${
        active ? "btn-primary-active" : ""
      }`}
      onClick={onClick}
      style={customStyle}
      disabled={disabled}
    >
      {text}
      <span className="h-10" style={customIconStyle}>
        {icon && <img className="h-full w-auto ml-2" src={icon} />}
      </span>
    </button>
  );
}

export function ButtonCustom({
  type = "button",
  text,
  icon,
  customClassName,
  customIconStyle,
  customStyle,
  onClick,
  disabled = false,
  active = false,
}) {
  return (
    <button
      type={type}
      className={`btn btn-third ${customClassName} ${
        active ? "btn-third-active" : ""
      }`}
      onClick={onClick}
      style={customStyle}
      disabled={disabled}
    >
      {text}
      <span className="h-10" style={customIconStyle}>
        {icon && <img className="h-full w-auto ml-2" src={icon} />}
      </span>
    </button>
  );
}

export default Button;
