import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api.js"
const sidebarLinks = [
  {
    label: "Dashboard", to: "/admin/dashboard",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  },
  {
    label: "Offices", to: "/admin/offices",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16M9 21v-6h6v6" /></svg>,
  },
  {
    label: "Bookings", to: "/admin/getbookings",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4" /></svg>,
  },
  {
    label: "users", to: "/admin/users",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
  },
  {
   label: "Buildings", to: "/admin/mybuildings",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 17v-2m3 2v-4m3 4v-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" /></svg>,
  },
];

function Buildings() {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  async function getBuildings() {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API}/getmybuildings`, { withCredentials: true });
      setBuildings(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load buildings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getBuildings(); }, []);

  async function logout() {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      navigate("/login", { replace: true });
    } catch (e) { console.error(e); }
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── SIDEBAR ── */}
      <aside className="w-56 bg-white border-r border-gray-200 flex-col justify-between py-6 px-4 shrink-0 hidden md:flex">
        <div>
          <div className="px-2 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm leading-tight">Admin Portal</p>
                <p className="text-xs text-gray-400">Building Management</p>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 px-4 py-2 w-96">
            {/* <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg> */}
            {/* <input placeholder="Search buildings..." className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full" /> */}
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 relative">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user?.name || "Admin"}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {initials}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">

          {/* Heading */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">My Buildings</h1>
              <p className="text-gray-400 text-sm mt-1">{buildings.length} properties registered</p>
            </div>
            <button
              onClick={() => navigate("/admin/addbuilding")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Building
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="border border-red-100 bg-red-50 px-4 py-3 rounded-xl flex items-center gap-3 mb-6">
              <span className="text-red-400">⚠</span>
              <p className="text-sm text-red-500">{error}</p>
              <button
                onClick={getBuildings}
                className="ml-auto text-xs text-gray-600 border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-8 bg-gray-100 rounded-lg w-28 mt-4" />
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && buildings.length === 0 && (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-24">
              <div className="text-5xl mb-4">🏢</div>
              <p className="font-semibold text-gray-700 mb-1">No buildings yet</p>
              <p className="text-sm text-gray-400 mb-5">Add your first building to get started</p>
              <button
                onClick={() => navigate("/admin/addbuilding")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
              >
                + Add Building
              </button>
            </div>
          )}

          {/* Cards grid */}
          {!loading && buildings.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {buildings.map((building, i) => (
                <div
                  key={building._id}
                  className="bg-white border border-gray-200 rounded-2xl hover:shadow-md hover:border-gray-300 transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
                        🏢
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                        Active
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {building.buildingName}
                    </h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {building.address}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-gray-50 rounded-b-2xl">
                    <span className="text-xs text-gray-400 font-mono">
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => navigate(`/admin/mybuildings/${building._id}/addoffice`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
                    >
                      + Add Office
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Buildings;