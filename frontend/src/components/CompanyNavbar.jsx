import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import AddCompanyAnimation from "./AddCompanyPanel";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import MyAccountDropdown from "./MyAccountDropdown";

export default function CompanyNavbar() {

  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  const navigate= useNavigate()
 const {setUser} = useAuth()
    
 
 useEffect(() => {
  function handleClickOutside(e) {
    if (accountRef.current && ! accountRef.current.contains(e.target)) {
      setAccountOpen(false);
    }
    }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  async function logout() {

     
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/logout",
      {},
      { withCredentials: true }
    );

    console.log("Logout response:", response);

    if (response.status === 200) {
      // IMPORTANT: clear frontend auth state if you have it
      setUser(null);  // if using AuthContext
      // setUser(null)

      navigate("/login", { replace: true });
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
}

    
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Left section */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="text-2xl font-bold text-black">
            OfficeSpace<span className="text-red-500"></span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm font-medium">
            <Link
              to="/"
              className="text-red-500 border-b-2 border-red-500 pb-1"
            >
              Home
            </Link>
            <Link to="/mybookings" className="text-gray-800 hover:text-black">
              My Bookings
            </Link>
            <Link
              to="/quick-access"
              className="text-gray-800 hover:text-black"
            >
              Quick access
            </Link>
            <Link to="/help" className="text-gray-800 hover:text-black">
              Help
            </Link>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          {/* Account */}
          <div className="flex items-center gap-3">
            <div className="text-right text-sm"  >
              <p className="font-medium text-gray-900">
                Sadfgh Fc cvvv
              </p>
              <p className="text-gray-500">My account</p>
            </div>

            {/* Avatar */}
           <div ref={accountRef} className="relative">
         <div
    onClick={() => setAccountOpen(prev => !prev)}
    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-600 text-sm font-semibold text-white"
           >
         SF
       </div>

       <MyAccountDropdown open={accountOpen} />
        </div>

          </div>

          {/* Add company button */}
          {/* <button className="h-12 bg-gradient-to-r from-indigo-950 to-indigo-900 px-6 text-sm font-semibold text-white hover:opacity-90">
            Add company
          </button> */}
          <div>
            <AddCompanyAnimation/>
          </div>
          <div>
            <button className="bg-black text-white px-6 py-2 rounded" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
