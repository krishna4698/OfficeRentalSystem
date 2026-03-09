import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

function OfficeDetail() {
  const navigate = useNavigate();
  const { officeid } = useParams();
  const [office, setOffice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getoffice() {
      try {
        const res = await axios.get(`http://localhost:3000/officedetials/${officeid}`, { withCredentials: true });
        setOffice(res.data);
        console.log(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    getoffice();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading office details...</p>
        </div>
      </div>
    );
  }

  if (!office) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Office not found.</p>
      </div>
    );
  }

  const isAvailable = office.availableStatus === "available";

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO IMAGE ── */}
      <div className="w-full h-72 md:h-96 overflow-hidden bg-gray-100 relative">
        {office.officeImage ? (
          <img
            src={office.officeImage}
            alt="Office"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-8xl opacity-20">🏢</span>
          </div>
        )}

        {/* Top bar overlay */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-2 rounded-xl shadow-sm">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-sm">WorkSpace</span>
          </div>

         
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Title section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
                  {isAvailable ? "Available" : "Occupied"}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">4.9</span>
                  <span className="text-xs text-gray-400">(124 reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                {office.buildingId?.buildingName} — Office #{office.officeNumber}
              </h1>
              <p className="text-gray-500 flex items-center gap-1.5 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {office.buildingId?.address}
              </p>
            </div>

            {/* Building & Capacity */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Building & Capacity</h2>
              <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
                {[
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                      </svg>
                    ),
                    label: "Capacity",
                    value: `Up to ${office.capacity} People`,
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9,22 9,12 15,12 15,22" />
                      </svg>
                    ),
                    label: "Floor",
                    value: `Floor ${office.floor}`,
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                      </svg>
                    ),
                    label: "Building",
                    value: office.buildingId?.buildingName,
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    ),
                    label: "Access",
                    value: "24/7 Secure Access",
                  },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3 text-gray-500">
                      {row.icon}
                      <span className="text-sm">{row.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

              <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="h-52 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "linear-gradient(#999 1px, transparent 1px), linear-gradient(90deg, #999 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                <div className="relative text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="font-semibold text-gray-700 text-sm">Map View</p>
                  <p className="text-xs text-gray-400 mt-1">{office.buildingId?.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* booki  */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">

              {/* Price */}
              <div className="p-5 border-b border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Starting at</p>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-gray-900">
                      ₹{Number(office.officeRent).toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 ml-1">/mo</span>
                  </div>
                  <span className="flex items-center gap-1 text-blue-600 text-xs font-semibold">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Instant Book
                  </span>
                </div>
              </div>

              {/* Info rows */}
              <div className="p-5 space-y-3 border-b border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                    </svg>
                    Capacity
                  </span>
                  <span className="font-semibold text-gray-900">{office.capacity} People</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    Floor
                  </span>
                  <span className="font-semibold text-gray-900">Floor {office.floor}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                    </svg>
                    Status
                  </span>
                  <span className={`font-semibold text-sm ${isAvailable ? "text-green-600" : "text-red-500"}`}>
                    {isAvailable ? "Available" : "Occupied"}
                  </span>
                </div>
              </div>

              {/* Book button */}
              <div className="p-5">
                {isAvailable ? (
                  <>
                    <button
                      onClick={() => navigate(`/company/dashboard/${officeid}/bookoffice`)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mb-2"
                    >
                      Book Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                    <p className="text-center text-xs text-gray-400">You won't be charged yet</p>
                  </>
                ) : (
                  <div className="w-full bg-gray-100 text-gray-400 font-semibold py-3.5 rounded-xl text-center text-sm">
                    Currently Unavailable
                  </div>
                )}
              </div>

              {/* Best price guarantee */}
              <div className="mx-5 mb-5 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
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

  
      <footer className="border-t border-gray-100 bg-white mt-10 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <span className="font-bold text-gray-900 uppercase text-sm tracking-wide">WorkSpace</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">Connecting modern professionals with premium office spaces worldwide.</p>
          </div>

          {[
            { title: "Platform", links: ["Search Offices", "Enterprise Solutions", "Community"] },
            { title: "Support",  links: ["Help Center", "Safety", "Cancellation"] },
            { title: "Follow Us", links: ["Twitter", "LinkedIn", "Instagram"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-xs text-gray-500 hover:text-gray-800 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default OfficeDetail;