import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getmybookings", {
          withCredentials: true,
        });
        console.log("from my bookings", res);
        setBookings(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const statusStyles = {
    approved: "bg-green-100 text-green-700 border border-green-200",
    rejected: "bg-gray-100 text-gray-500 border border-gray-200",
    pending:  "bg-yellow-100 text-yellow-700 border border-yellow-200",
  };


  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── SIDEBAR ── */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4 shrink-0 hidden md:flex">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 px-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg">OfficeRent</span>
          </div>

         
        </div>

        {/* User at bottom */}
        <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-xl">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "User"}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">My Bookings</h1>
          
        </div>

        {/* Page content */}
        <div className="flex-1 p-8">

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading your bookings...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Table card */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-5">
                {bookings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="text-5xl mb-4">📋</div>
                    <p className="font-semibold text-gray-700 mb-1">No bookings yet</p>
                    <p className="text-sm text-gray-400 mb-5">Start by browsing available offices</p>
                    <button
                      onClick={() => navigate("/company/dasboard")}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
                    >
                      Browse Offices
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-100 bg-gray-50">
                            {["Office Number", "Building", "Date", "Amount", "Status", "Action"].map((h) => (
                              <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest px-6 py-4">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50 transition-colors">

                              <td className="px-6 py-4">
                                <p className="text-sm font-semibold text-gray-900">Office #{booking.officeid.officeNumber}</p>
                                <p className="text-xs text-gray-400 mt-0.5">Floor {booking.officeid.floor}</p>
                              </td>

                              <td className="px-6 py-4">
                                <p className="text-sm font-medium text-gray-900">{booking.officeid.buildingId.buildingName}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{booking.officeid.buildingId.address}</p>
                              </td>

                              <td className="px-6 py-4">
                                <p className="text-sm text-gray-700">
                                  {new Date(booking.startdate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  → {new Date(booking.enddate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </p>
                              </td>

                              <td className="px-6 py-4">
                                <p className="text-sm font-semibold text-gray-900">₹{Number(booking.bookingAmount).toLocaleString()}</p>
                              </td>

                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[booking.status] || "bg-gray-100 text-gray-600"}`}>
                                  {booking.status}
                                </span>
                              </td>

                              <td className="px-6 py-4">
                                {booking.status !== "rejected" ? (
                                  <button
                                    onClick={() => navigate(`/company/dashboard/${booking.officeid._id}/details`)}
                                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                                  >
                                    View
                                  </button>
                                ) : (
                                  <span className="text-gray-300 text-sm">—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Table footer */}
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        Showing {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Need a new space banner */}
              <div className="bg-blue-600 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Need a new space?</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    Explore hundreds of offices across India. Book for a day or a month. Flex work has never been easier.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/company/dashboard")}
                  className="bg-white text-blue-600 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap shrink-0"
                >
                  Book Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;