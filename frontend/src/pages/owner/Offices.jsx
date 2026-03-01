import { useEffect, useState } from "react";
import axios from "axios";

function OfficeCard({ office }) {
  const isOpen =
    !office.status ||
    office.status.toLowerCase() === "open" ||
    office.status.toLowerCase() === "available";

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center text-lg">
            💼
          </div>
          <span
            className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
              isOpen
                ? "text-green-600 bg-green-50 border-green-100"
                : "text-gray-500 bg-gray-50 border-gray-200"
            }`}
          >
            {office.status || "Open"}
          </span>
        </div>
        <p className="text-sm font-semibold text-gray-900 mb-0.5">
          {office.officeName || office.name}
        </p>
        <p className="text-xs text-gray-500">
          {office.buildingName || office.building}
        </p>
      </div>

      <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50 rounded-b-lg">
        <div className="flex gap-4">
          {office.floor && (
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Floor</p>
              <p className="text-xs font-medium text-gray-700 mt-0.5">{office.floor}</p>
            </div>
          )}
          {office.capacity && (
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Capacity</p>
              <p className="text-xs font-medium text-gray-700 mt-0.5">{office.capacity}</p>
            </div>
          )}
          {office.price && (
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Price</p>
              <p className="text-xs font-medium text-gray-700 mt-0.5">${office.price}</p>
            </div>
          )}
        </div>
        <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded hover:bg-gray-100 hover:text-gray-800 transition-colors">
          Details
        </button>
      </div>
    </div>
  );
}

const Offices = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:3000/office/getoffices",
          { withCredentials: true }
        );
        setOffices(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load offices");
      } finally {
        setLoading(false);
      }
    };
    fetchOffices();
  }, []);

  const statuses = ["All", "Open", "Booked"];
  const filtered =
    filter === "All"
      ? offices
      : offices.filter(
          (o) =>
            (o.status || "Open").toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Spaces</p>
          <h2 className="text-xl font-bold text-gray-900">All Offices</h2>
        </div>
        <span className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-sm bg-gray-50">
          {offices.length} total
        </span>
      </div>

      {/* Filter tabs */}
      {!loading && offices.length > 0 && (
        <div className="flex gap-2 mb-5">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs font-medium px-4 py-1.5 rounded border transition-all ${
                filter === s
                  ? "bg-black text-white border-black"
                  : "text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800 bg-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5 animate-pulse bg-white">
              <div className="w-9 h-9 bg-gray-100 rounded-md mb-4" />
              <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="border border-red-100 bg-red-50 px-4 py-3 rounded-lg flex items-center gap-3">
          <span className="text-red-400">⚠</span>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center py-16 bg-white">
          <div className="text-4xl mb-3">💼</div>
          <p className="text-sm text-gray-400">No offices found</p>
        </div>
      )}

      {/* Grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((office) => (
            <OfficeCard key={office._id} office={office} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Offices;