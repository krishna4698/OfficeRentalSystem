import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

function MyBookings() {
  const{user}= useAuth();
  const [bookings, setBookings] = useState([]);
  // const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/getmybookings",
          // {userId:user.id},
          // {user.id},
         
          { withCredentials: true }
        );
        console.log(res);
        
        setBookings(res.data);
        // setCount(res.data.count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading bookings...</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">My Bookings</h1>
        <p className="text-gray-600">
          {/* Total Bookings: <span className="font-medium">{count}</span> */}
        </p>
      </div>

      {/* Booking List */}
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">
                  Office: {booking.officeid}
                </h2>
                <p className="text-sm text-gray-600">
                  {new Date(booking.startdate).toDateString()} →{" "}
                  {new Date(booking.enddate).toDateString()}
                </p>
                <p className="text-sm">
                  Amount: ₹{booking.bookingAmount}
                </p>
              </div>

              {/* Status */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : booking.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
    // <div>
    //   {user.id}
    // </div>
  );
}

export default MyBookings;
