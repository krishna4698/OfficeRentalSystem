import { useNavigate } from "react-router-dom";
import Buildings from "./Buildings";
import Offices from "./Offices";
import { useEffect } from "react";

function BuildingDashboard() {

 const navigate=  useNavigate()

  
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black flex items-center justify-center text-white font-bold text-xs rounded">
              B
            </div>
            <span className="font-bold text-gray-900">OFFICE RENT</span>
            <span className="text-xs text-gray-400 ml-1 hidden sm:block">Admin</span>
          </div>
          <div >
            <button  className="bg-black text-white rounded-lg w-full" onClick={()=>navigate("/admin/getbookings")}>
              Booking Request
            </button>
            
          </div>
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-bold rounded-full">
            AD
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Page heading */}
        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Overview</p>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <Buildings />

        <hr className="border-gray-200 mb-10" />

        <Offices />
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-gray-400">BuildOS Admin · v1.0</p>
          <p className="text-xs text-gray-400">© 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default BuildingDashboard;