import axios from "axios";
import { useState } from "react";

function AddBuilding() {
  const [buildingName, setBuildingName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  async function addBuilding() {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/registerbuilding",
        {
          buildingName,
          address,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Success:", res.data);
      alert("Building added successfully!");

      // reset form
      setBuildingName("");
      setAddress("");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Building</h2>

      <input
        type="text"
        placeholder="Building Name"
        value={buildingName}
        onChange={(e) => setBuildingName(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={addBuilding}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Adding..." : "Add Building"}
      </button>
    </div>
  );
}

export default AddBuilding;
