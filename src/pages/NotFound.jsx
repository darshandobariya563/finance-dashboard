import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__card">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>
          The page you requested does not exist. Return to the financial dashboard
          to continue reviewing your data.
        </p>
        <Link to="/dashboard" className="btn btn--primary btn--md">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
