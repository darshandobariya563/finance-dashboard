function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon = null,
  fullWidth = false,
  type = 'button',
  ...props
}) {
  const buttonClassName = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClassName} type={type} {...props}>
      {icon ? <span className="btn__icon">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}

export default Button;
