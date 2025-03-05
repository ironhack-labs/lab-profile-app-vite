import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <button>
        <Link to="/signup">Sign Up</Link>
      </button>
      <button>
        <Link to="/login">Log In</Link>
      </button>
    </div>
  );
}

export default HomePage;
