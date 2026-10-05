import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/" className="text-lg font-bold text-blue-600">
          Invoice Tracker
        </Link>
        <div className="flex gap-2">
          <NavLink to="/" className={linkClass} end>
            Invoice
          </NavLink>
          <NavLink to="/expenses" className={linkClass}>
            Expenses
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
