import { useState } from "react";
import axios from "axios";

function CreateOffice() {
  const [formData, setFormData] = useState({
    officeNumber: "",
    floor: "",
    capacity: "",
    officeRent: "",
    availableStatus: "available",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.post(
        "http://localhost:3000/offices",
        formData,
        { withCredentials: true }
      );

      setMessage("Office created successfully ✅");

      setFormData({
        officeNumber: "",
        floor: "",
        capacity: "",
        officeRent: "",
        availableStatus: "available",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create office ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-black p-8"
      >
        <h1 className="text-2xl font-semibold text-black mb-6 text-center">
          Create Office
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            name="officeNumber"
            placeholder="Office Number"
            value={formData.officeNumber}
            onChange={handleChange}
            className="w-full border border-black px-3 py-2 outline-none focus:bg-gray-100"
            required
          />

          <input
            type="text"
            name="floor"
            placeholder="Floor"
            value={formData.floor}
            onChange={handleChange}
            className="w-full border border-black px-3 py-2 outline-none focus:bg-gray-100"
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full border border-black px-3 py-2 outline-none focus:bg-gray-100"
            required
          />

          <input
            type="number"
            name="officeRent"
            placeholder="Monthly Rent"
            value={formData.officeRent}
            onChange={handleChange}
            className="w-full border border-black px-3 py-2 outline-none focus:bg-gray-100"
            required
          />

          <select
            name="availableStatus"
            value={formData.availableStatus}
            onChange={handleChange}
            className="w-full border border-black px-3 py-2 bg-white outline-none focus:bg-gray-100"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 font-medium hover:bg-gray-900 transition"
          >
            Create Office
          </button>
        </div>

        {message && (
          <p className="text-green-600 text-center mt-4">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 text-center mt-4">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default CreateOffice;
