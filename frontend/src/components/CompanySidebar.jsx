import { useState } from "react";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "browse-offices",
    label: "Browse Offices",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: "my-offices",
    label: "My Bookings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
];

export default function CompanySidebar({ active = "dashboard", onNavigate }) {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`${open ? "w-64" : "w-16"} transition-all duration-300 bg-black text-white flex flex-col h-screen flex-shrink-0`}
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {open && (
          <span className="text-xl font-bold tracking-widest uppercase text-white" style={{ letterSpacing: "0.15em" }}>
            OfficeRent
          </span>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="p-1 rounded hover:bg-white/10 transition text-white ml-auto"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Company Badge */}
      {open && (
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
              CO
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">Acme Corp</p>
              <p className="text-xs text-white/50 tracking-wider uppercase">Company</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate && onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-150
              ${active === item.id
                ? "bg-white text-black font-semibold"
                : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {open && <span className="text-sm tracking-wide">{item.label}</span>}
            {active === item.id && open && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-black" />
            )}
          </button>
        ))}
      </nav>

      {open && (
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-xs text-white/30 tracking-widest uppercase">v1.0.0</p>
        </div>
      )}
    </aside>
  );
}