import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import API from "../api.js"
const stats = [
  { value: "500+", label: "Offices Listed" },
  { value: "120+", label: "Buildings" },
  { value: "2,000+", label: "Happy Tenants" },
  { value: "15+", label: "Cities" },
];

const features = [
  { icon: "🏢", title: "Verified Buildings",  desc: "Every building is verified and inspected by our team before listing." },
  { icon: "⚡", title: "Instant Booking",     desc: "Book your office space in minutes. No paperwork, no hassle." },
  { icon: "📍", title: "Prime Locations",     desc: "Offices in the most sought-after business districts across India." },
  { icon: "💼", title: "Flexible Terms",      desc: "Monthly, quarterly or yearly leases. You choose what works for you." },
  { icon: "🔒", title: "Secure Payments",     desc: "All transactions are encrypted and 100% secure." },
  { icon: "📞", title: "24/7 Support",        desc: "Our team is always available to help you with any query." },
];

const testimonials = [
  { name: "Rahul Sharma",  company: "TechStart Inc.",    text: "Found the perfect office for our team in just 2 days. The process was incredibly smooth.", avatar: "RS" },
  { name: "Priya Mehta",   company: "Design Studio Co.", text: "Best office rental platform in Mumbai. Great locations and very transparent pricing.", avatar: "PM" },
  { name: "Arjun Kapoor",  company: "FinTech Labs",      text: "We scaled from 4 desks to 20 desks within months. BuildOS made it effortless.", avatar: "AK" },
];

const NAV_LINKS = [
  { label: "Offices",   href: "#offices" },
  { label: "Features",  href: "#features" },
  { label: "Reviews",   href: "#testimonials" },
  { label: "Contact",   href: "#contact" },
];

// ── OFFICE CARD ────────────────────────────────────────────────────────────────
function OfficeCard({ office }) {
  const navigate= useNavigate();
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
      {/* Image / placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center">
        <span className="text-6xl opacity-20">🏢</span>

        {/* Status badge */}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
          office.availableStatus === "available"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-600 border border-gray-200"
        }`}>
          {office.availableStatus}
        </span>

        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full px-2.5 py-1">
          <span className="text-xs font-bold text-blue-600">
            ₹{(office.officeRent / 1000).toFixed(0)}k
            <span className="font-normal text-gray-400">/mo</span>
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 text-sm">{office.offcieNumber}</h3>
        </div>
        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {office.buildingId.address}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg">{office.capacity} capacity</span>
          <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg">Floor {office.floor}</span>
          <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg">{office.buildingId.buildingName}</span>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
       onClick={()=>navigate(`/company/dashboard/${office._id}/details`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function AuthLanding() {
  const [search, setSearch]         = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [office, setOffice]         = useState([]);
  const navigate = useNavigate();
  const {user}= useAuth();



  useEffect(() => {
    async function getOffices() {
      const offices = await axios.get(`${API}/alloffices`,{params:{search:search} , withCredentials: true });
    
      console.log("from landing", offices);
      setOffice(offices.data.data);
    }
    const timer= setTimeout(() => {
        getOffices();
    }, 500);
    return ()=>clearTimeout(timer)
    
  }, [search]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            OfficeRent
          </div>

        
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l.label}</a>
            ))}
          </nav>

            
          {user?<p className="">{user.email}</p>: <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate("/login")} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
              Login
            </button>
            <button onClick={() => navigate("/register")} className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors">
              Sign Up
            </button>
          </div>}     
         


          {/* Mobile toggle */}
          <button className="md:hidden text-gray-600 text-xl" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>


         
         
         
         

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-gray-600">{l.label}</a>
            ))}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button onClick={() => navigate("/login")} className="flex-1 text-sm font-medium border border-gray-200 py-2 rounded-lg">Login</button>
              <button onClick={() => navigate("/register")} className="flex-1 text-sm font-semibold bg-blue-600 text-white py-2 rounded-lg">Sign Up</button>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-blue-700">500+ offices available right now</span>
            </div>

            <h1 className="text-5xl font-extrabold leading-tight text-gray-900 mb-5">
              Find the Perfect<br />
              <span className="text-blue-600">Office Space</span><br />
              for Your Team
            </h1>

            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Discover premium office spaces across India's top business districts.
              Flexible terms, verified buildings, instant booking.
            </p>

            {/* Search bar */}
            <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-lg p-2 gap-2">
              <div className="flex items-center gap-2 flex-1 px-3">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by location, building or office..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                />
                {/* {search && (
                  <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">✕</button>
                )} */}
              </div>
              <button  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                Search
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Popular:&nbsp;
              {["Mumbai", "Bandra", "Downtown", "Powai"].map((c, i) => (
                <span key={c}>
                  <button onClick={() => setSearch(c)} className="hover:text-gray-700 underline">{c}</button>
                  {i < 3 && " · "}
                </span>
              ))}
            </p>
          </div>

        
          <div className="relative hidden md:block">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-80 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
              <span className="text-9xl opacity-20">🏢</span>
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <h1></h1>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">2,000+ Tenants</p>
                <p className="text-xs text-gray-400">Trusted across India</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="border-y border-gray-100 bg-white py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-gray-900 mb-1">{s.value}</p>
              <p className="text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OFFICES GRID ── */}
      <section id="offices" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Available Now</p>
              <h2 className="text-3xl font-bold text-gray-900">
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
              <p className="font-semibold text-gray-700 mb-1">No offices found Please login</p>
              <p className="text-sm text-gray-400">Try searching for a different location</p>
              <button onClick={() => setSearch("")} className="mt-4 text-sm font-medium bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {office.map((o) => (
                <OfficeCard key={o.id} office={o} />
              ))}
             
            </div>
          )}

          <div className="text-center mt-10">
            <button onClick={()=>navigate("/company/dashboard")} className="text-sm font-semibold border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
              View All Offices →
            </button>
          </div>
        </div>
      </section>

    
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Process</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Find your space in minutes</h2>
          <p className="text-gray-500 mb-14 text-sm">Our streamlined process takes the stress out of office hunting.</p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>, title: "1. Search & Filter", desc: "Browse hundreds of offices with filters for capacity, floor, and building." },
              { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>, title: "2. Instant Booking", desc: "Book instantly — no complex paperwork or long-term commitments required." },
              { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, title: "3. Move In & Scale", desc: "Get 24/7 access to your new space and scale as your team grows." },
            ].map((step) => (
              <div key={step.title} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Why OfficeRent</p>
            <h2 className="text-3xl font-bold text-gray-900">Everything You Need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

         <section id="testimonials" className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">Testimonials</p>
              <h2 className="text-4xl font-extrabold text-white mb-10 leading-tight">
                Trusted by over 2,000 teams across India
              </h2>
              <div className="flex flex-col gap-5">
                {testimonials.map((t) => (
                  <div key={t.name} className="bg-gray-800 rounded-2xl p-5">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                      <div>
                        <p className="text-white font-semibold text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

     
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <p className="text-4xl font-extrabold text-white mb-1">{s.value}</p>
                  <p className="text-gray-400 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-3xl p-14 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-3">Ready to Find Your Office?</h2>
          <p className="text-blue-200 mb-8">
            Join 2,000+ companies already using OfficeRent to manage their office spaces.<br />No hidden fees, just great work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/register")} className="bg-white text-blue-600 font-bold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
              Get Started Free
            </button>
            <button className="border-2 border-white text-white font-bold px-7 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

          <footer id="contact" className="bg-gray-50 border-t border-gray-100 py-14 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg text-gray-900 mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              OfficeRent
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">Premium office rental platform for modern businesses across India.</p>
            <div className="flex flex-col gap-1 text-xs text-gray-400">
              <span>hello@buildos.in</span>
              <span>+91 98765 43210</span>
              <span>Mumbai, India</span>
            </div>
          </div>

          {[
            { title: "Product",  links: ["Browse Offices", "List Your Office", "Pricing", "Enterprise"] },
            { title: "Company",  links: ["About Us", "Blog", "Careers", "Press"] },
            { title: "Support",  links: ["Help Center", "Contact", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-gray-900 mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-xs text-gray-500 hover:text-gray-800 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 OfficeRent. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-gray-700 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-700 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}