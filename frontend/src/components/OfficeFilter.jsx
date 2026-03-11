import { useState } from "react";

function OfficeFilter({ filter, setFilter }) {
  const [teamSize, setTeamSize] = useState("1-5");
  const [amenities, setAmenities] = useState({
    wifi: true,
    meetingRooms: false,
    access247: true,
  });

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const toggleAmenity = (key) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const teamSizes = ["1-5", "6-20", "21-50", "50+"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M3 4h18M7 8h10M11 12h4" />
        </svg>
        <h2 className="font-bold text-gray-900 text-base">Filters</h2>
      </div>

      <div className="p-5 space-y-6">

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <div className="relative">
            <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white appearance-none outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer">
              <option>All Locations</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Pune</option>
            </select>
            <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">Price Range (₹/mo)</label>
            <span className="text-xs font-semibold text-blue-600">
              ₹0 – ₹{filter.maxPrice ? Number(filter.maxPrice).toLocaleString() : "1,00,000"}
            </span>
          </div>
          <input
            type="range"
            name="maxPrice"
            min="0"
            max="100000"
            step="1000"
            value={filter.maxPrice || 100000}
            onChange={handleChange}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Team Size */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Team Size</label>
          <div className="grid grid-cols-2 gap-2">
            {teamSizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setTeamSize(size);
                  const min = size === "50+" ? 50 : parseInt(size.split("-")[0]);
                  setFilter({ ...filter, minCapacity: min });
                }}
                className={`py-2 rounded-xl text-sm font-medium border transition-all ${
                  teamSize === size
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Amenities</label>
          <div className="space-y-2.5">
            {[
              { key: "wifi",         label: "High-speed WiFi" },
              { key: "meetingRooms", label: "Meeting Rooms" },
              { key: "access247",    label: "24/7 Access" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={amenities[key]}
                  onChange={() => toggleAmenity(key)}
                  className="w-4 h-4 rounded accent-blue-600 border-gray-300"
                />
                <span className="text-sm text-gray-600">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Apply button */}
      <div className="px-5 pb-5">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default OfficeFilter;