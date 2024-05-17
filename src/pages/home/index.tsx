import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      <div>Home</div>
    </div>
  );
};

export default Home;
