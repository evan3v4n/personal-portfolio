
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-[#1A1F2C]/90 backdrop-blur-sm z-50 p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-end space-x-6">
        <Link to="/" className="nav-link">home</Link>
        <Link to="/photography" className="nav-link">photography</Link>
        <Link to="/projects" className="nav-link">projects</Link>
        <Link to="/blog" className="nav-link">blog</Link>
        <Link to="/about" className="nav-link">about</Link>
      </div>
    </nav>
  );
};

export default Navigation;
