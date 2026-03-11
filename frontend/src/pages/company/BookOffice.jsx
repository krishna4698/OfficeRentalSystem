import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import API from "../../api.js"

function BookOffice() {
  const { officeid } = useParams();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    startdate: "",
    enddate: "",
    bookingAmount: 20000,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/booking/create`,
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

  // Calculate days between dates
  const getDays = () => {
    if (!formData.startdate || !formData.enddate) return 0;
    const diff = new Date(formData.enddate) - new Date(formData.startdate);
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const days = getDays();
  const serviceFee = Math.round(formData.bookingAmount * 0.05);
  const total = formData.bookingAmount + serviceFee;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Office Booking</p>
          <h1 className="text-3xl font-extrabold text-gray-900">Book This Office</h1>
          <p className="text-gray-400 text-sm mt-1">Fill in the details to submit your booking request</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── LEFT — Form ── */}
          <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

            {/* Office image */}
            <div className="h-52 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80"
                alt="Office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-lg">Office #{officeid?.slice(-5)}</p>
                <p className="text-white/70 text-xs">Booking Request</p>
              </div>
            </div>

            {/* Form fields */}
            <div className="p-6 space-y-5">

              {/* Dates row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Start Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Start Date
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <input
                      type="date"
                      name="startdate"
                      required
                      value={formData.startdate}
                      onChange={handleChange}
                      className="flex-1 text-sm text-gray-900 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    End Date
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <input
                      type="date"
                      name="enddate"
                      required
                      value={formData.enddate}
                      onChange={handleChange}
                      className="flex-1 text-sm text-gray-900 outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Days indicator */}
              {days > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                  </svg>
                  <p className="text-sm text-blue-700 font-medium">
                    Duration: <span className="font-bold">{days} day{days !== 1 ? "s" : ""}</span>
                  </p>
                </div>
              )}

              {/* Booking Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Booking Amount
                </label>
                <div className="flex items-center border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 gap-3">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                  <input
                    type="number"
                    value={formData.bookingAmount}
                    readOnly
                    className="flex-1 text-sm text-gray-500 outline-none bg-transparent"
                  />
                  <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-md">Fixed</span>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Request Booking
              </button>

              <p className="text-center text-xs text-gray-400">
                Your booking request will be reviewed by admin
              </p>
            </div>
          </div>

          {/* ── RIGHT — Summary card ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">


   
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-4">
              <h3 className="font-bold text-gray-900">What happens next?</h3>

              {[
                { icon: "📋", step: "1", title: "Request Submitted", desc: "Your booking request is sent to the admin for review and you get detail to your Email." },
                { icon: "⏳", step: "2", title: "Admin Reviews",     desc: "Admin approves or rejects your request within 24hrs." },
                { icon: "✅", step: "3", title: "Confirmation",      desc: "You'll be notified via email once your booking is confirmed." },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-base shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Best Price Guarantee</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">Find a lower price elsewhere and we'll match it plus give you 10% credit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookOffice;