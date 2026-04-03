function Loader({ label = 'Loading dashboard...', fullScreen = false }) {
  return (
    <div className={fullScreen ? 'loader-screen' : 'loader'}>
      <span className="loader__spinner" aria-hidden="true" />
      <p className="loader__label">{label}</p>
    </div>
  );
}

export default Loader;
