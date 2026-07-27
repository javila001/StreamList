import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">🎬</div>
        <div>
          <h1>StreamList</h1>
          <p>Your cloud-based watchlist</p>
        </div>
      </div>
      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'link active' : 'link'}>
          StreamList
        </NavLink>
        <NavLink to="/movies" className={({ isActive }) => isActive ? 'link active' : 'link'}>
          Movies
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? 'link active' : 'link'}>
          Cart
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'link active' : 'link'}>
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
