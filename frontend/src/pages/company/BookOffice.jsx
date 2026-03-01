import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function BookOffice() {
  const { officeid } = useParams();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    startdate: "",
    enddate: "",
    bookingAmount: 20000,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/booking/create",
        {
          officeid,
          startdate: formData.startdate,
          enddate: formData.enddate,
          bookingAmount: formData.bookingAmount,
          userId: user.id,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Booking request sent");
      }
    } catch (e) {
      console.error(e);
      toast.error("Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 flex items-center justify-center">
      
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg md:grid md:grid-cols-2">
        
        {/* LEFT - Image (hidden on mobile) */}
        <div className="h-48 sm:h-64 md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
            alt="Office"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT - Form */}
        <div className="p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Book This Office
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Fill the details to request booking
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                name="startdate"
                required
                value={formData.startdate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                name="enddate"
                required
                value={formData.enddate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
              />
            </div>

            {/* Booking Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Booking Amount
              </label>
              <input
                type="number"
                value={formData.bookingAmount}
                readOnly
                className="mt-1 w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-600"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-black py-3 text-white font-semibold active:scale-[0.98]"
            >
              Request Booking
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-500">
            Your booking request will be reviewed by admin
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookOffice;
