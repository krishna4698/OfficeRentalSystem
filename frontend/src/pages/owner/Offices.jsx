import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ── SIDEBAR LINKS (same as dashboard) ─────────────────────────────────────────
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
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
  },
  {
    label: "Users", to: "/admin/users",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
  },
  {
   label: "Buildings", to: "/admin/mybuildings",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 17v-2m3 2v-4m3 4v-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" /></svg>,
  },
];

// ── MAIN ──────────────────────────────────────────────────────────────────────
const Offices = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/office/getoffices", { withCredentials: true });
        setOffices(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load offices");
      } finally {
        setLoading(false);
      }
    };
    fetchOffices();
  }, []);

  async function logout() {
    try {
      await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/login", { replace: true });
    } catch (e) { console.error(e); }
  }

  const statuses = ["All", "Open", "Booked"];

  const filtered = offices.filter((o) => {
    const matchFilter = filter === "All" || (o.status || "Open").toLowerCase() === filter.toLowerCase();
    const matchSearch = !search ||
      (o.officeName || o.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.buildingName || o.building || "").toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalSpaces   = offices.length;
  const occupied      = offices.filter((o) => (o.status || "").toLowerCase() === "booked" || (o.status || "").toLowerCase() === "occupied").length;
  const available     = offices.filter((o) => !o.status || o.status.toLowerCase() === "open" || o.status.toLowerCase() === "available").length;

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  const statusStyle = (status) => {
    const s = (status || "open").toLowerCase();
    if (s === "available" || s === "open")
      return "bg-green-100 text-green-700 border border-green-200";
    if (s === "booked" || s === "occupied")
      return "bg-blue-100 text-blue-700 border border-blue-200";
    return "bg-gray-100 text-gray-500 border border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── SIDEBAR ── */}
      <aside className="w-56 bg-white border-r border-gray-200 flex-col justify-between py-6 px-4 shrink-0 hidden md:flex">
        <div>
          {/* Logo */}
          <div className="px-2 mb-8">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm leading-tight">Admin Portal</p>
                <p className="text-xs text-gray-400">Office Management</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout */}
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
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-96">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search offices, buildings, or locations..."
              className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors relative">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
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
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Office Spaces</h1>
              <p className="text-gray-400 text-sm mt-1">Total {totalSpaces} properties currently managed</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Filter tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                      filter === s
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={() => navigate("/admin/addbuilding")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add New Office
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Spaces",  value: totalSpaces, sub: "↑ 12% from last month", subColor: "text-green-500", progress: null },
              { label: "Occupied",      value: occupied,    sub: null, progress: totalSpaces ? Math.round((occupied / totalSpaces) * 100) : 0 },
              { label: "Available",     value: available,   sub: `${available} newly listed this week`, subColor: "text-gray-400", progress: null },
              { label: "Revenue",       value: "—",         sub: "Expected this month", subColor: "text-gray-400", progress: null },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">{s.label}</p>
                <p className="text-3xl font-extrabold text-gray-900 mb-1">{s.value}</p>
                {s.progress !== null && (
                  <div className="h-1.5 bg-gray-100 rounded-full mt-2">
                    <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: `${s.progress}%` }} />
                  </div>
                )}
                {s.sub && <p className={`text-xs mt-1 ${s.subColor}`}>{s.sub}</p>}
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

            {/* Loading */}
            {loading && (
              <div className="p-8 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="p-6 flex items-center gap-3 bg-red-50">
                <span className="text-red-400">⚠</span>
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-5xl mb-4">💼</div>
                <p className="font-semibold text-gray-700 mb-1">No offices found</p>
                <p className="text-sm text-gray-400">Try adjusting your filters</p>
              </div>
            )}

            {/* Table */}
            {!loading && filtered.length > 0 && (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        {["Office Name / ID", "Building", "Location", "Monthly Price", "View"].map((h) => (
                          <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest px-6 py-3">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filtered.map((office) => (
                        <tr key={office._id} className="hover:bg-gray-50 transition-colors">

                          {/* Name / ID */}
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-gray-900">{office.officeName || office.name || `Office #${office._id?.slice(-4)}`}</p>
                            <p className="text-xs text-gray-400 mt-0.5">ID: OFF-{office._id?.slice(-4).toUpperCase()}</p>
                          </td>

                          {/* Building */}
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-700">{office.buildingName || office.building || office.buildingId?.buildingName || "—"}</p>
                          </td>

                          {/* Location */}
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-700">{office.buildingId?.address || office.address || "—"}</p>
                          </td>

                          {/* Price */}
                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold text-gray-900">
                              {office.price ? `$${office.price}` : office.officeRent ? `₹${Number(office.officeRent).toLocaleString()}` : "—"}
                            </p>
                          </td>

                          
                          <button className="bg-blue-600 px-4 py-1 rounded-xl">View</button>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offices;