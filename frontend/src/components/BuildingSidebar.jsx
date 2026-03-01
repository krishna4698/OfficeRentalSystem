import { useState } from "react";
import BuildingDashboad from "../pages/owner/BuildingDashboad";
import AddBuilding from "../pages/owner/AddBuilding";

const Pages={
    // "dashboard":<BuildingDashboad/>,
    "add-building":<AddBuilding/>

}

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
    id: "add-building",
    label: "Add Building",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M3 21h18M3 7v14M21 7v14M6 21V7M18 21V7M3 7l9-4 9 4M12 3v4M9 12h6M9 16h6" />
      </svg>
    ),
  },
  {
    id: "buildings",
    label: "My Buildings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M3 21h18M4 21V5a1 1 0 011-1h14a1 1 0 011 1v16M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    id: "add-office",
    label: "Add Office",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 5v14M5 12h14" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
  },
  {
    id: "offices",
    label: "My Offices",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
];

// Props:
// - active (string): currently active nav id
// - onNavigate (function): called with nav id when user clicks a nav item
export default function Sidebar({ active = "dashboard", onNavigate }) {
    
  const [open, setOpen] = useState(true);
  const[page, setpage]=useState("dashboard")

  const handleNav = (id) => {
    if (onNavigate) onNavigate(id);
    

  };

  return (
    <aside
      className={`${open ? "w-64" : "w-16"} transition-all duration-300 bg-black text-white flex flex-col h-screen`}
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {open && (
          <span className="text-xl font-bold tracking-widest uppercase text-white" style={{ letterSpacing: "0.18em" }}>
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

      {/* Owner Badge */}
      {open && (
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
              OW
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">John Owner</p>
              {/* <p className="text-xs text-white/50 tracking-wider uppercase">Property Owner</p> */}
            </div>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id) }
            
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-150
              ${active === item.id
                ? "bg-white text-black font-semibold"
                : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {open && (
              <span className="text-sm tracking-wide">{item.label}</span>
            )}
            {active === item.id && open && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-black"></span>
            )}
          </button>
        ))}
      </nav>

      {/* Version */}
      {open && (
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-xs text-white/30 tracking-widest uppercase">v1.0.0</p>
        </div>
      )}
    </aside>
  );
}