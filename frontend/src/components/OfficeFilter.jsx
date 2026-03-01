import { useState } from "react";

function OfficeFilters({ filter, setFilter }) {
  const [open, setOpen] = useState(null);

  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };

  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-sm rounded-xl bg-white p-4 shadow">
      
      {/* Header */}
      <h2 className="mb-4 text-lg font-semibold">Filters</h2>

      {/* Capacity */}
      <div className="border-b">
        <button
          onClick={() => toggle("capacity")}
          className="flex w-full items-center justify-between py-4 text-left font-medium"
        >
          Capacity
          <span>{open === "capacity" ? "▲" : "▼"}</span>
        </button>

        {open === "capacity" && (
          <div className="pb-4">
            <input
              type="number"
              name="minCapacity"
              placeholder="Minimum capacity"
              value={filter.minCapacity || ""}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b">
        <button
          onClick={() => toggle("price")}
          className="flex w-full items-center justify-between py-4 text-left font-medium"
        >
          Price Range
          <span>{open === "price" ? "▲" : "▼"}</span>
        </button>

        {open === "price" && (
          <div className="space-y-3 pb-4">
            <input
              type="number"
              name="maxPrice"
              placeholder="Max price"
              value={filter.maxPrice || ""}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OfficeFilters;
