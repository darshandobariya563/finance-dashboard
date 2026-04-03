function Card({ title, subtitle, action, className = '', children }) {
  return (
    <section className={['card', className].filter(Boolean).join(' ')}>
      {(title || subtitle || action) && (
        <header className="card__header">
          <div>
            {title ? <h2 className="card__title">{title}</h2> : null}
            {subtitle ? <p className="card__subtitle">{subtitle}</p> : null}
          </div>
          {action ? <div className="card__action">{action}</div> : null}
        </header>
      )}
      <div className="card__body">{children}</div>
    </section>
  );
}

export default Card;
