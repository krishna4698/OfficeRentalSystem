import axios from "axios";
import { useEffect, useState } from "react";

function GetBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/getbookings", { withCredentials: true });
        setBookings(res.data);
      } catch (e) {
        console.log("the error is", e);
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  async function handleAction(bookingId, action) {
    try {
      setActionLoading(bookingId);
      await axios.patch(
        "http://localhost:3000/booking/updatebooking",
        { bookingId, action },
        { withCredentials: true }
      );
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId
            ? { ...b, status: action === "approved" ? "approved" : "rejected" }
            : b
        )
      );
    } catch (e) {
      alert(e.response?.data?.message || `Failed to ${action} booking`);
    } finally {
      setActionLoading(null);
    }
  }

  const statuses = ["All", "pending", "approved", "rejected"];
  const filtered = filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  const statusStyle = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-700 border border-green-200";
      case "pending":  return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "rejected": return "bg-red-100 text-red-600 border border-red-200";
      default:         return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  const pendingCount  = bookings.filter((b) => b.status === "pending").length;
  const approvedCount = bookings.filter((b) => b.status === "approved").length;
  const rejectedCount = bookings.filter((b) => b.status === "rejected").length;

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-gray-50 min-h-screen">

      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Bookings</h1>
          <p className="text-gray-400 text-sm mt-1">{bookings.length} total booking requests</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg capitalize transition-all ${
                filter === s
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total",    value: bookings.length, color: "text-gray-900",   bg: "bg-white",     border: "border-gray-200"  },
          { label: "Pending",  value: pendingCount,    color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
          { label: "Approved", value: approvedCount,   color: "text-green-600",  bg: "bg-green-50",  border: "border-green-200"  },
          { label: "Rejected", value: rejectedCount,   color: "text-red-500",    bg: "bg-red-50",    border: "border-red-200"    },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-5`}>
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

        {/* Loading */}
        {loading && (
          <div className="p-8 space-y-4">
            {[...Array(4)].map((_, i) => (
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
            <div className="text-5xl mb-4">📋</div>
            <p className="font-semibold text-gray-700 mb-1">No bookings found</p>
            <p className="text-sm text-gray-400">Try changing the filter</p>
          </div>
        )}

        {/* Table */}
        {!loading && filtered.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {["#", "Office", "Amount", "Start Date", "End Date", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest px-6 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((booking, i) => (
                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">

                      {/* # */}
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-400">{String(i + 1).padStart(2, "0")}</p>
                      </td>

                      {/* Office */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {booking.officeid?.buildingId?.buildingName || "—"}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                          ...{booking.officeid?._id?.slice(-6) || booking.officeid?.slice(-6)}
                        </p>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-gray-900">
                          ₹{booking.bookingAmount?.toLocaleString()}
                        </p>
                      </td>

                      {/* Start date */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">{formatDate(booking.startdate)}</p>
                      </td>

                      {/* End date */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">{formatDate(booking.enddate)}</p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        {booking.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAction(booking._id, "approved")}
                              disabled={actionLoading === booking._id}
                              className="w-8 h-8 bg-green-100 hover:bg-green-200 text-green-600 rounded-full flex items-center justify-center transition-colors disabled:opacity-40"
                              title="Approve"
                            >
                              {actionLoading === booking._id ? (
                                <div className="w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                            <button
                              onClick={() => handleAction(booking._id, "rejected")}
                              disabled={actionLoading === booking._id}
                              className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-500 rounded-full flex items-center justify-center transition-colors disabled:opacity-40"
                              title="Reject"
                            >
                              {actionLoading === booking._id ? (
                                <div className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-300 text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Showing <span className="font-semibold text-gray-700">{filtered.length}</span> of{" "}
                <span className="font-semibold text-gray-700">{bookings.length}</span> bookings
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GetBookings;