import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust path if needed

const OfficeCard = ({ office, mode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAvailable = office.availableStatus === "available";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row">

        {/* ── LEFT — Image ── */}
        <div className="sm:w-52 h-48 sm:h-auto flex-shrink-0 relative overflow-hidden bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
            alt="Office"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent sm:bg-gradient-to-r" />

          {/* Status badge over image */}
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-sm ${
              isAvailable
                ? "bg-white/90 text-green-700 border-green-200"
                : "bg-black/80 text-white border-transparent"
            }`}>
              {office.availableStatus}
            </span>
          </div>

          {/* Rent badge over image */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
              ₹{Number(office.officeRent).toLocaleString()}
              <span className="font-normal opacity-80">/mo</span>
            </span>
          </div>
        </div>

        {/* ── RIGHT — Content ── */}
        <div className="flex-1 p-5 flex flex-col justify-between">

          {/* Top section */}
          <div>
            {/* Title row */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 leading-tight">
                  Office #{office.officeNumber}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  🏢 {office.buildingId?.buildingName}
                </p>
              </div>
              {/* Office number tag */}
              <span className="font-mono text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md mt-0.5">
                #{String(office._id).slice(-5)}
              </span>
            </div>

            {/* Address */}
            <p className="text-xs text-gray-500 mb-4 flex items-start gap-1">
              <span className="mt-px">📍</span>
              <span>{office.buildingId?.address}</span>
            </p>

            {/* Info chips */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5">
                <span className="text-xs">🏗</span>
                <div>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider leading-none">Floor</p>
                  <p className="text-xs font-semibold text-gray-800 leading-tight">{office.floor}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5">
                <span className="text-xs">👥</span>
                <div>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider leading-none">Capacity</p>
                  <p className="text-xs font-semibold text-gray-800 leading-tight">{office.capacity} people</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5">
                <span className="text-xs">💰</span>
                <div>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider leading-none">Rent</p>
                  <p className="text-xs font-semibold text-gray-800 leading-tight">₹{Number(office.officeRent).toLocaleString()}/mo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom — Book button */}
          {mode === "company" && isAvailable && (
            <button
              onClick={() => navigate(`${office._id}/details`)}
              className="mt-4 w-full bg-black text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-800 active:scale-95 transition-all"
            >
              View
            </button>
          )}

          {/* Not available message */}
          {mode === "company" && !isAvailable && (
            <div className="mt-4 w-full text-center text-xs text-gray-400 bg-gray-50 border border-gray-100 py-2.5 rounded-xl">
              Currently not available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeCard;




//  function OfficeCard({ office }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all group">
//       {/* Image placeholder */}
//       <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center relative overflow-hidden">
//         <span className="text-5xl opacity-30">🏢</span>
//         <div className="absolute top-3 left-3">
//           <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
//             office.tag === "Premium" ? "bg-black text-white" :
//             office.tag === "Popular" ? "bg-gray-800 text-white" :
//             office.tag === "New"     ? "bg-gray-700 text-white" :
//             "bg-gray-100 text-gray-700 border border-gray-200"
//           }`}>
//             {office.tag}
//           </span>
//         </div>
//         <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full px-2.5 py-1">
//           <span className="text-xs font-bold text-gray-900">₹{(office.price/1000).toFixed(0)}k<span className="font-normal text-gray-500">/mo</span></span>
//         </div>
//       </div>

//       <div className="p-4">
//         <h3 className="font-bold text-gray-900 text-sm mb-0.5">{office.name}</h3>
//         <p className="text-xs text-gray-500 mb-3">📍 {office.location}</p>

//         <div className="flex items-center gap-3 mb-4">
//           <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded">
//             {office.desks} desks
//           </span>
//           <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded">
//             Floor {office.floor}
//           </span>
//           <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded">
//             {office.building}
//           </span>
//         </div>

//         <button className="w-full bg-black text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// }