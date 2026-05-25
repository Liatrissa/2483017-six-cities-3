import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="page page--gray">
      <main className="page__main">
        <div className="container">
          <h1>404 Not Found</h1>
          <p>Page not found.</p>
          <Link to="/">Go to main page</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
