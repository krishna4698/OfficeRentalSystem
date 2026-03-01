import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Buildings() {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function getBuildings() {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("http://localhost:3000/getmybuildings", {
        withCredentials: true,
      });
      setBuildings(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load buildings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBuildings();
  }, []);

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Properties</p>
          <h2 className="text-xl font-bold text-gray-900">My Buildings</h2>
        </div>
        <div>
          <button className="bg-black text-white rounded-lg " onClick={()=>navigate("/admin/addbuilding") } >Add Building</button>
        </div>
        <span className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-sm bg-gray-50">
          {buildings.length} total
        </span>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5 animate-pulse bg-white">
              <div className="h-4 bg-gray-100 rounded w-2/3 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
              <div className="h-8 bg-gray-100 rounded w-28" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="border border-red-100 bg-red-50 px-4 py-3 rounded-lg flex items-center gap-3 mb-4">
          <span className="text-red-400">⚠</span>
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={getBuildings}
            className="ml-auto text-xs text-gray-600 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && buildings.length === 0 && (
        <div className="border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center py-16 bg-white">
          <div className="text-4xl mb-3">🏢</div>
          <p className="text-sm text-gray-400">No buildings found</p>
        </div>
      )}

      {/* Cards */}
      {!loading && buildings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buildings.map((building, i) => (
            <div
              key={building._id}
              className="bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center text-lg">
                      🏢
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {building.buildingName}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        📍 {building.address}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-sm">
                    Active
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50 rounded-b-lg">
                <span className="text-[11px] text-gray-400">
                  #{String(i + 1).padStart(2, "0")}
                </span>
                <button
                  onClick={() =>
                    navigate(`/admin/mybuildings/${building._id}/addoffice`)
                  }
                  className="text-xs font-semibold bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800 transition-colors"
                >
                  + Add Office
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Buildings;