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

  const Field = ({ label, placeholder, value, onChange, type = "text" }) => (
    <div>
      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 bg-gray-50 rounded px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-md">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors mb-6"
        >
          ← Back to Buildings
        </button>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">

          {/* Card header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center text-lg">
                💼
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest">New Space</p>
                <h2 className="text-base font-bold text-gray-900">Add Office</h2>
              </div>
            </div>
          </div>

          {/* Building ID badge */}
          <div className="px-6 pt-5">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2 mb-5">
              <span className="text-xs text-gray-400">Building ID:</span>
              <span className="text-xs font-mono font-medium text-gray-700 truncate">{buildingId}</span>
            </div>
          </div>

          {/* Form fields */}
          <div className="px-6 pb-5 flex flex-col gap-4">
            <Field
              label="Office Number"
              placeholder="e.g. A-101"
              value={officeNumber}
              onChange={(e) => setOfficeNumber(e.target.value)}
            />
            <Field
              label="Floor"
              placeholder="e.g. 3rd"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Capacity"
                placeholder="e.g. 10"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
              <Field
                label="Office Rent"
                placeholder="e.g. 5000"
                type="number"
                value={officeRent}
                onChange={(e) => setOfficeRent(e.target.value)}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded px-3 py-2">
                <span className="text-red-400 text-sm">⚠</span>
                <p className="text-xs text-red-500">{error}</p>
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-3">
            <button
              onClick={handleAddOffice}
              disabled={loading}
              className="flex-1 bg-black text-white text-sm font-semibold py-2.5 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "+ Add Office"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-500 border border-gray-200 px-4 py-2.5 rounded hover:bg-gray-100 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOffice;