import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import OfficeCard from "./OfficeCard";
import axios from "axios";




// ── STATIC DATA ────────────────────────────────────────────────────────────────
// const featuredOffices = [
//   { id: 1, name: "Executive Suite A", building: "Nexus Tower", location: "Downtown, Mumbai", price: 45000, desks: 10, floor: "5th", tag: "Popular" },
//   { id: 2, name: "Open Studio 3B",    building: "Harbor Centre", location: "Bandra, Mumbai",  price: 28000, desks: 6,  floor: "3rd", tag: "New" },
//   { id: 3, name: "Corner Office 12",  building: "Central Hub",  location: "Andheri, Mumbai",  price: 32000, desks: 8,  floor: "2nd", tag: "Available" },
//   { id: 4, name: "Premium Suite 7",   building: "West Campus",  location: "Powai, Mumbai",    price: 55000, desks: 15, floor: "7th", tag: "Premium" },
//   { id: 5, name: "Compact Office C1", building: "Nexus Tower",  location: "Downtown, Mumbai", price: 18000, desks: 4,  floor: "1st", tag: "Available" },
//   { id: 6, name: "Boardroom Suite",   building: "Harbor Centre",location: "Bandra, Mumbai",   price: 72000, desks: 20, floor: "8th", tag: "Premium" },
// ];

const stats = [
  { value: "500+", label: "Offices Listed" },
  { value: "120+", label: "Buildings" },
  { value: "2,000+", label: "Happy Tenants" },
  { value: "15+", label: "Cities" },
];

const features = [
  { icon: "🏢", title: "Verified Buildings",   desc: "Every building is verified and inspected by our team before listing." },
  { icon: "⚡", title: "Instant Booking",      desc: "Book your office space in minutes. No paperwork, no hassle." },
  { icon: "📍", title: "Prime Locations",      desc: "Offices in the most sought-after business districts across India." },
  { icon: "💼", title: "Flexible Terms",       desc: "Monthly, quarterly or yearly leases. You choose what works for you." },
  { icon: "🔒", title: "Secure Payments",      desc: "All transactions are encrypted and 100% secure." },
  { icon: "📞", title: "24/7 Support",         desc: "Our team is always available to help you with any query." },
];

const testimonials = [
  { name: "Rahul Sharma",   company: "TechStart Inc.",    text: "Found the perfect office for our team in just 2 days. The process was incredibly smooth.", avatar: "RS" },
  { name: "Priya Mehta",    company: "Design Studio Co.", text: "Best office rental platform in Mumbai. Great locations and very transparent pricing.", avatar: "PM" },
  { name: "Arjun Kapoor",   company: "FinTech Labs",      text: "We scaled from 4 desks to 20 desks within months. BuildOS made it effortless.", avatar: "AK" },
];

// ── COMPONENTS ─────────────────────────────────────────────────────────────────
function OfficeCard({ office }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all group">
      {/* Image placeholder */}
      <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center relative overflow-hidden">
        <span className="text-5xl opacity-30">🏢</span>
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
            // office.tag === "Premium" ? "bg-black text-white" :
            // office.tag === "Popular" ? "bg-gray-800 text-white" :
            office.availableStatus === "available"     ? "bg-gray-700 text-white" :
            "bg-gray-100 text-gray-700 border border-gray-200"
          }`}>
            {office.availableStatus}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full px-2.5 py-1">
          <span className="text-xs font-bold text-gray-900">₹{(office.officeRent/1000).toFixed(0)}k<span className="font-normal text-gray-500">/mo</span></span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm mb-0.5">{office.offcieNumber}</h3>
        <p className="text-xs text-gray-500 mb-3">📍 {office.buildingId.address}</p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded">
            {office.capacity} capacity
          </span>
          <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded">
            Floor {office.floor}
          </span>
          <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded">
            {office.buildingId.buildingName}
          </span>
        </div>

        <button className="w-full bg-black text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}

// ── MAIN LANDING PAGE ──────────────────────────────────────────────────────────
export default function AuthLanding() {

  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [office, setOffice]= useState([])
  const navigate= useNavigate() 
 

  // const filtered = featuredOffices.filter(o =>
  //   o.location.toLowerCase().includes(search.toLowerCase()) ||
  //   o.name.toLowerCase().includes(search.toLowerCase()) ||
  //   o.building.toLowerCase().includes(search.toLowerCase())
  // );
    
    useEffect(  (req,res)=>{
        
      async function getOffices(){
     
        const offices= await axios.get("http://localhost:3000/alloffices", {withCredentials:true})
        console.log( "from landing",offices);
        setOffice(offices.data.data)
        
      }
      getOffices()
       
    
}, [])

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .fade-up  { animation: fadeUp 0.6s ease both; }
        .fade-in  { animation: fadeIn 0.4s ease both; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.2s; }
        .d3 { animation-delay: 0.3s; }
        .d4 { animation-delay: 0.4s; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-sm">B</div>
            <span className="font-bold text-gray-900 text-lg">Office Rent</span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#offices"      className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Offices</a>
            <a href="#features"     className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</a>
            <a href="#testimonials" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Reviews</a>
            <a href="#contact"      className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Contact</a>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button  onClick={()=>navigate("/login")} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
              Login
            </button>
            <button  onClick={()=>navigate("/register")}  className="text-sm font-semibold bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-600" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
            <a href="#offices"  className="text-sm text-gray-600">Offices</a>
            <a href="#features" className="text-sm text-gray-600">Features</a>
            <a href="#reviews"  className="text-sm text-gray-600">Reviews</a>
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button className="flex-1 text-sm font-medium border border-gray-200 py-2 rounded-lg">Login</button>
              <button className="flex-1 text-sm font-semibold bg-black text-white py-2 rounded-lg">Sign Up</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="pt-28 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-up d1 inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-600">500+ offices available right now</span>
          </div>

          <h1 className="fade-up d2 text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-6">
            Find Your Perfect<br />
            <span className="text-gray-400">Office Space</span>
          </h1>

          <p className="fade-up d3 text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            Discover premium office spaces across India's top business districts. 
            Flexible terms, verified buildings, instant booking.
          </p>

          {/* Search bar */}
          <div className="fade-up d4 max-w-2xl mx-auto">
            <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-lg shadow-gray-100 p-2 gap-2">
              <div className="flex items-center gap-3 flex-1 px-3">
                <span className="text-gray-400 text-lg">📍</span>
                <input
                  type="text"
                  placeholder="Search by location, building or office name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
                )}
              </div>
              <button className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors whitespace-nowrap">
                Search
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Popular: <button onClick={() => setSearch("Mumbai")} className="hover:text-gray-700 underline">Mumbai</button> · 
              <button onClick={() => setSearch("Bandra")} className="hover:text-gray-700 underline ml-1">Bandra</button> · 
              <button onClick={() => setSearch("Downtown")} className="hover:text-gray-700 underline ml-1">Downtown</button> · 
              <button onClick={() => setSearch("Powai")} className="hover:text-gray-700 underline ml-1">Powai</button>
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 border-y border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-black text-gray-900 mb-1">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OFFICES GRID ── */}
      <section id="offices" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Available Now</p>
              <h2 className="text-3xl font-black text-gray-900">
                {search ? `Results for "${search}"` : "Featured Offices"}
              </h2>
            </div>
            {search && (
              <p className="text-sm text-gray-500">{office.length} office{office.length !== 1 ? "s" : ""} found</p>
            )}
          </div>

          {office.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-semibold text-gray-700 mb-1">No offices found</p>
              <p className="text-sm text-gray-400">Try searching for a different location</p>
              <button onClick={() => setSearch("")} className="mt-4 text-sm font-medium bg-black text-white px-5 py-2 rounded-lg">
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {office.map(office => (
                <OfficeCard key={office.id} office={office} />
              ))}
            </div>
            
          )}
            



          <div className="text-center mt-10">
            <button className="text-sm font-semibold border-2 border-black text-black px-8 py-3 rounded-xl hover:bg-black hover:text-white transition-all">
              View All Offices →
            </button>
          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Explore</p>
            <h2 className="text-3xl font-black text-gray-900">Find Offices Near You</h2>
            <p className="text-gray-500 mt-2 text-sm">Google Maps integration coming soon</p>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-2xl h-80 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Fake map grid */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "linear-gradient(#999 1px, transparent 1px), linear-gradient(90deg, #999 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative text-center">
              <div className="text-5xl mb-3">🗺️</div>
              <p className="font-bold text-gray-700 text-lg">Interactive Map</p>
              <p className="text-sm text-gray-500 mt-1 mb-4">Browse offices visually on a map</p>
              <button className="bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-800 transition-colors">
                Enable Map View
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Why BuildOS</p>
            <h2 className="text-3xl font-black text-gray-900">Everything You Need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-400 hover:shadow-sm transition-all">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Reviews</p>
            <h2 className="text-3xl font-black text-gray-900">What Our Tenants Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <p className="text-sm text-gray-600 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Find Your Office?</h2>
          <p className="text-gray-400 mb-8">Join 2,000+ companies already using BuildOS to manage their office spaces.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-black font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
              Get Started Free
            </button>
            <button className="border border-gray-700 text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-900 transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" className="bg-gray-50 border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-black rounded-md flex items-center justify-center text-white font-black text-xs">B</div>
                <span className="font-bold text-gray-900">BuildOS</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">Premium office rental platform for modern businesses.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-3 text-sm">Product</p>
              {["Browse Offices", "List Your Office", "Pricing", "Enterprise"].map(l => (
                <p key={l} className="text-sm text-gray-500 hover:text-gray-800 cursor-pointer mb-2">{l}</p>
              ))}
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-3 text-sm">Company</p>
              {["About Us", "Blog", "Careers", "Press"].map(l => (
                <p key={l} className="text-sm text-gray-500 hover:text-gray-800 cursor-pointer mb-2">{l}</p>
              ))}
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-3 text-sm">Contact</p>
              <p className="text-sm text-gray-500 mb-2">hello@buildos.in</p>
              <p className="text-sm text-gray-500 mb-2">+91 98765 43210</p>
              <p className="text-sm text-gray-500">Mumbai, India</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">© 2026 BuildOS. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer">Privacy Policy</span>
              <span className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}