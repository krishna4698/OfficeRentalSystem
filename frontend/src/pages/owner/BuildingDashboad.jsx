import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function BuildingDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [offices, setOffices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [offRes, bkRes] = await Promise.all([
          axios.get("http://localhost:3000/office/getoffices",  { withCredentials: true }),
          axios.get("http://localhost:3000/getbookings",  { withCredentials: true }),
        ]);
           setOffices(offRes.data);
        setBookings(bkRes.data);
         
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStats(false);
      }
    }
    fetchStats();
  }, []);

  // useEffect(()=>{
  //     const getoffices= async ()=>{
  //    const res=   await axios.get("http://localhost:3000/getbookings", {withCredentials: true});
  //    console.log("this is res",res);
  //       setBookings(res.data)
  //     }
      
  //     getoffices();
  // },[])
  console.log("tiis is offices from teh admin dasboard", offices)

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  
  const activeBookings  = bookings.filter((b) => b.status === "approved");
  console.log("apporoved", activeBookings)
  const stats = [
    {
      label: "Total Offices",
      value: offices.length,
      change: "+5%", up: true,
      bg: "bg-blue-50",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16M9 21v-6h6v6" />
        </svg>
      ),
    },
    {
      label: "Active Bookings",
      value: activeBookings.length,
      change: "+12%", up: true,
      bg: "bg-green-50",
      icon: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      label: "Pending Requests",
      value: pendingBookings.length,
      change: "-3%", up: false,
      bg: "bg-orange-50",
      icon: (
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ];

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

  const statusStyle = {
    pending:  "bg-yellow-100 text-yellow-700 border border-yellow-200",
    approved: "bg-green-100 text-green-700 border border-green-200",
    rejected: "bg-gray-100 text-gray-500 border border-gray-200",
  };

  async function handleApprove(id) {
    try {
      await axios.patch(`http://localhost:3000/admin/bookings/${id}/approve`, {}, { withCredentials: true });
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: "approved" } : b));
    } catch (e) { console.error(e); }
  }

  async function handleReject(id) {
    try {
      await axios.patch(`http://localhost:3000/admin/bookings/${id}/reject`, {}, { withCredentials: true });
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: "rejected" } : b));
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
          <div className="flex items-center gap-2 px-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900">Admin portal</span>
          </div>

          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive}) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
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

        {/* User */}
        <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-xl">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "Admin"}</p>
            <p className="text-xs text-gray-400">System Admin</p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">

        
        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Real-time overview of system performance and active requests.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {loadingStats ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
                  <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
                  <div className="h-8 bg-gray-100 rounded w-1/3" />
                </div>
              ))
            ) : (
              stats.map((s) => (
                <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">{s.label}</p>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
                      <span className={`text-xs font-semibold mb-1 ${s.up ? "text-green-500" : "text-red-500"}`}>
                        {s.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                    {s.icon}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pending Approvals Table */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg">Pending Booking Approvals</h2>
              <button
                onClick={() => navigate("/admin/getbookings")}
                className="text-sm text-blue-600 font-semibold hover:underline"
              >
                View all
              </button>
            </div>

            {pendingBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-sm text-gray-400">No pending approvals</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {["User", "Office Space", "Date & Time", "Status", "Actions"].map((h) => (
                        <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest px-6 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pendingBookings.slice(0, 5).map((booking) => {
                      const ini = booking.userId?.name
                        ? booking.userId.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                        : "??";
                      return (
                        <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                                {ini}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{booking.userId?.name || "Unknown"}</p>
                                <p className="text-xs text-gray-400">{booking.userId?.email || ""}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-900">{booking.officeid?.buildingId?.buildingName || "—"}</p>
                            <p className="text-xs text-gray-400">Office #{booking.officeid?.officeNumber} · Floor {booking.officeid?.floor}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-700">
                              {new Date(booking.startdate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                            <p className="text-xs text-gray-400">
                              → {new Date(booking.enddate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle[booking.status] || "bg-gray-100 text-gray-600"}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleApprove(booking._id)}
                                className="w-8 h-8 bg-green-100 hover:bg-green-200 text-green-600 rounded-full flex items-center justify-center transition-colors"
                                title="Approve"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleReject(booking._id)}
                                className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors"
                                title="Reject"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default BuildingDashboard;