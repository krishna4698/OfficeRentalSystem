import axios from "axios";
import { useEffect, useState } from "react";

function GetBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [actionLoading, setActionLoading] = useState(null); // stores booking _id being acted on

  useEffect(() => {
    const fetchBookings = async (res, req) => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/getbookings", {
          withCredentials: true,
        });
        setBookings(res.data);
      } catch (e) {
        // setError(e.response?.data?.message || "Failed to load bookings");
        // res.json(e)
        console.log( "the error is " ,e );
        
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
        {bookingId, action},
        { withCredentials: true }
      );
      // update status locally so UI reflects change instantly
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

  const filtered =
    filter === "All"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  function formatDate(dateStr) {   
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const statusStyle = (status) => {
    switch (status) {
      case "approved": return "text-green-600 bg-green-50 border-green-100";
      case "pending":  return "text-yellow-600 bg-yellow-50 border-yellow-100";
      case "rejected": return "text-red-500 bg-red-50 border-red-100";
      default:         return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="mb-12">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Requests</p>
          <h2 className="text-xl font-bold text-gray-900">Bookings</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-yellow-600 bg-yellow-50 border border-yellow-100 px-3 py-1 rounded-sm">
            {bookings.filter((b) => b.status === "pending").length} pending
          </span>
          <span className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-sm bg-gray-50">
            {bookings.length} total
          </span>
        </div>
      </div>

      {/* Filter tabs */}
      {!loading && bookings.length > 0 && (
        <div className="flex gap-2 mb-5">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs font-medium px-4 py-1.5 rounded border transition-all capitalize ${
                filter === s
                  ? "bg-black text-white border-black"
                  : "text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800 bg-white"
              }`}
            >
              {s }
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 animate-pulse">
              <div className="flex gap-4">
                <div className="h-4 bg-gray-100 rounded w-1/4" />
                <div className="h-4 bg-gray-100 rounded w-1/4" />
                <div className="h-4 bg-gray-100 rounded w-1/4" />
                <div className="h-4 bg-gray-100 rounded w-16 ml-auto" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="border border-red-100 bg-red-50 px-4 py-3 rounded-lg flex items-center gap-3">
          <span className="text-red-400">⚠</span>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center py-16 bg-white">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-sm text-gray-400">No bookings found</p>
        </div>
      )}

      {/* Table */}
      {!loading && filtered.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">

          {/* Table header */}
          <div className="grid grid-cols-7 gap-3 px-5 py-3 border-b border-gray-100 bg-gray-50">
            {["#", "Office ID", "Amount", "Start Date", "End Date", "Status", "Actions"].map((h) => (
              <p key={h} className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                {h}
              </p>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((booking, i) => (
            <div
              key={booking._id}
              className="grid grid-cols-7 gap-3 px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0 items-center"
            >
              {/* Index */}
              <p className="text-xs text-gray-400">{String(i + 1).padStart(2, "0")} </p>

              {/* Office ID */}
              <p className="text-xs font-mono text-gray-600 truncate" title={booking.officeid}>
                ...{booking.officeid?.slice(-6)}
              </p>

              {/* Amount */}
              <p className="text-sm font-semibold text-gray-900">
                ₹{booking.bookingAmount?.toLocaleString()}
              </p>

              {/* Start date */}
              <p className="text-xs text-gray-500">{formatDate(booking.startdate)}</p>

              {/* End date */}
              <p className="text-xs text-gray-500">{formatDate(booking.enddate)}</p>

              {/* Status badge */}
              <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-sm border w-fit capitalize ${statusStyle(booking.status)}`}>
                {booking.status}
              </span>

              {/* Actions — only show for pending */}
              <div className="flex gap-2">
                {booking.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleAction(booking._id, "approved")}
                      disabled={actionLoading === booking._id}
                      className="text-xs font-medium bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {actionLoading === booking._id ? "..." : "Approve"}
                    </button> 
                    <button
                      onClick={() => handleAction(booking._id, "rejected")}
                      disabled={actionLoading === booking._id}
                      className="text-xs font-medium text-red-500 border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {actionLoading === booking._id ? "..." : "Reject"}
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-300">—</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetBookings;
