import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OfficeCard = ({ office, mode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const isAvailable = office.availableStatus === "available";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {office.officeImage ? (
          <img
            src={office.officeImage}
            alt="Office"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80"
            alt="Office"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Tag badge (Featured / New Listing / etc) */}
        {isAvailable && (
          <div className="absolute top-3 left-3">
            <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              Featured
            </span>
          </div>
        )}

        {/* Wishlist button */}
        {/* <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <svg
            className={`w-4 h-4 transition-colors ${liked ? "fill-red-500 text-red-500" : "fill-none text-gray-400"}`}
            stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button> */}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name + Rating */}
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-gray-900 text-base leading-tight">
            {office.buildingId?.buildingName || `Office #${office.officeNumber}`}
          </h3>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-yellow-500">4.8</span>
          </div>
        </div>

        {/* Location */}
        <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {office.buildingId?.address}
        </p>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
            </svg>
            Up to {office.capacity}
          </span>
          <span className="text-gray-300">·</span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
            Floor {office.floor}
          </span>
        </div>

        {/* Price + Book */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold text-gray-900">
              ₹{Number(office.officeRent).toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 ml-1">/mo</span>
          </div>

          {mode === "company" && isAvailable && (
            <button
              onClick={() => navigate(`${office._id}/details`)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
            >
              View
            </button>
          )}

          {mode === "company" && !isAvailable && (
            <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeCard;