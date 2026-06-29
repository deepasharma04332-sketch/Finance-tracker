import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        💰 FinTrack
      </Link>

      {user && (
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">
            Dashboard
          </Link>
          <Link to="/transactions" className="text-gray-600 hover:text-indigo-600 font-medium">
            Transactions
          </Link>
          <span className="text-sm text-gray-500">Hi, {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
