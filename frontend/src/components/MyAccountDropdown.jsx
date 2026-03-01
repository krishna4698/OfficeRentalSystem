import { useNavigate } from "react-router-dom";

export default function MyAccountDropdown({ open }) {
  const navigate= useNavigate();


  return (
    <div
      className={`absolute right-0 top-14 w-64 rounded-lg border bg-white shadow-lg transition-all duration-200
      ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
    >
      {/* Header */}
      <div className="border-b px-4 py-3">
        <p className="font-medium text-gray-900">Sadfgh Fc cvvv</p>
        <p className="text-sm text-gray-500">My Account</p>
      </div>

      {/* Items */}
      <div className="py-2 text-sm">
        <MenuItem onClick={()=>navigate("/myprofile")} label="My Profile" />
        <MenuItem   label="Company Details" />
        <MenuItem label="Settings" />
      </div>
    </div>
  );
}

function MenuItem({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2 text-left hover:bg-gray-100"
    >
      {label}
    </button>
  );
}
