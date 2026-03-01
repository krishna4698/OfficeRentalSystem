
import logo from "../assets/Screenshot 2026-02-15 173533.png"
import {Link} from "react-router-dom"
export default function AuthLanding() {
  return (
    <div className="min-h-screen bg-[#f8f5f1]">
      {/* Navbar */}
      <header className="flex items-center justify-between px-16 py-5 bg-white">
        <div className="text-2xl font-bold">Office Rent</div>

        {/* <nav className="flex gap-8 text-gray-800 font-medium">
          <a href="#">Products</a>
          <a href="#">Solutions</a>
          <a href="#">Explore</a>
          <a href="#">Resources</a>
        </nav> */}

        <div className="flex items-center gap-6 text-sm">
          <span>📞 +91 876665180</span>
          <button className="bg-[#0b0b3b] text-white px-4 py-2 rounded-md">
            Contact us
          </button>
          <span>🌐 EN</span>
          <span>👤</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex items-center justify-between px-16 py-20">
        {/* Left */}
        <div className="max-w-xl">
          <h1 className="text-[56px] font-bold text-[#0b0b3b] leading-tight mb-6">
            Sign in or create an account
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            Unlock exclusive benefits and streamline your workspace experience
            by creating a Regus account or signing in today.
          </p>

          <div className="flex gap-4">
            <Link className="bg-[#0b0b3b] text-white px-7 py-3 rounded-lg text-base" Link to ="/login">
            Login
            </Link>

            {/* <button className="border-2 border-[#0b0b3b] text-[#0b0b3b] px-7 py-3 rounded-lg text-base flex items-center gap-2" >
              Sign Up <span>→</span>
            </button> */}
            <Link className="border-2 border-[#0b0b3b] text-[#0b0b3b] px-7 py-3 rounded-lg text-base flex items-center gap-2" Link to="/register">
            Signup
             </Link>
          </div>
        </div>

        {/* Right Image */}
        <div>
          <img
            src={logo}
            alt="workspace"
            className="w-[520px] rounded-lg object-cover"
          />
        </div>
      </main>
    </div>
  );
}

