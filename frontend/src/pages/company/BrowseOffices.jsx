import axios from "axios";
import React, { useEffect, useState } from "react";
import OfficeCard from "../../components/OfficeCard";
import { useAuth } from "../../context/AuthContext";
import OfficeFilter from "../../components/OfficeFilter";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";

function BrowseOffices() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const search = params.get("search");
  const [offices, setOffices] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filter, setFilter] = useState({ minCapacity: "", maxPrice: "" });

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await axios.get("http://localhost:3000/alloffices", {
          params: { limit: 5, page, search, ...filter },
          withCredentials: true,
        });
        setOffices(res.data.data);
        setPages(res.data.pages);
      } catch (e) {
        console.error("Failed to fetch offices", e);
      }
    };
    fetchOffices();
  }, [filter, page, search]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* LEFT: FILTER */}
        <div className="lg:col-span-1 lg:sticky lg:top-6 h-fit">
          <OfficeFilter filter={filter} setFilter={setFilter} />
        </div>

        {/* RIGHT: OFFICES */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Available Workspaces</h1>
              <p className="text-sm text-gray-400 mt-1">
                {search ? `Results for "${search}"` : `Showing ${offices.length} premium offices`}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              Sort by:
              <select className="font-semibold text-gray-900 bg-transparent outline-none cursor-pointer">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Cards grid */}
          {offices.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-semibold text-gray-700 mb-1">No offices found</p>
              <p className="text-sm text-gray-400">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {offices.map((office) => (
                <OfficeCard key={office._id} office={office} mode={user.role} />
              ))}
            </div>
          )}

          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default BrowseOffices;