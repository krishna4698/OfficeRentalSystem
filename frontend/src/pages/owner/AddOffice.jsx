import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddOffice() {
  const { buildingId } = useParams();
  const navigate = useNavigate();

  const [officeNumber, setOfficeNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [capacity, setCapacity] = useState("");
  const [officeRent, setOfficeRent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAddOffice() {
    setError("");
    if (!officeNumber || !floor || !capacity || !officeRent) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:3000/office/create",
        {
          officeNumber,
          floor,
          capacity: Number(capacity),
          officeRent: Number(officeRent),
          buildingId,
        },
        { withCredentials: true }
      );
      navigate(-1);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Card header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16M9 21v-6h6v6" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Office</h2>
              <p className="text-sm text-gray-400 mt-0.5">Fill in the details below to register a new workspace in your inventory.</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 py-6 flex flex-col gap-5">

          {/* Row 1 — Office Number + Floor */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Office Number</label>
              <div className="flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus-within:border-blue-400 focus-within:bg-white transition-colors">
                <span className="text-gray-400 font-bold text-sm">#</span>
                <input
                  type="text"
                  placeholder="e.g. OF-101"
                  value={officeNumber}
                  onChange={(e) => setOfficeNumber(e.target.value)}
                  className="bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Floor</label>
              <div className="flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus-within:border-blue-400 focus-within:bg-white transition-colors">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M5 12h14M5 6h14M5 18h14" />
                </svg>
                <input
                  type="text"
                  placeholder="e.g. 5"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none w-full"
                />
              </div>
            </div>
          </div>

          {/* Row 2 — Capacity + Rent */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Capacity (People)</label>
              <div className="flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus-within:border-blue-400 focus-within:bg-white transition-colors">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
                <input
                  type="number"
                  placeholder="e.g. 10"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Monthly Rent</label>
              <div className="flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus-within:border-blue-400 focus-within:bg-white transition-colors">
                <span className="text-gray-400 text-sm font-medium">₹</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={officeRent}
                  onChange={(e) => setOfficeRent(e.target.value)}
                  className="bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none w-full"
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <span className="text-red-400">⚠</span>
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-gray-600 px-6 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddOffice}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" />
            </svg>
            {loading ? "Adding..." : "Add Office"}
          </button>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 mt-5">
        ℹ Need help? Contact our{" "}
        <span className="text-blue-500 cursor-pointer hover:underline">Support Center</span>
      </p>
    </div>
  );
}

export default AddOffice;