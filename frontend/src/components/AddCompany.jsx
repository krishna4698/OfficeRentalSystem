import { useState } from "react";

const AddCompany = () => {
  const [company, setCompany] = useState({
    name: "",
    address: "",
  });

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(company);

    // later you will call API here
    // axios.post("/api/company", company)
  };

  return (
    <div className="max-w-lg bg-white border border-black rounded-lg p-6">
      <h2 className="text-2xl font-bold text-black mb-6">
        Add Your Company
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Company Name
          </label>
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleChange}
            placeholder="Enter company name"
            className="w-full border border-black px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        {/* Company Address */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Company Address
          </label>
          <textarea
            name="address"
            value={company.address}
            onChange={handleChange}
            placeholder="Enter company address"
            rows="3"
            className="w-full border border-black px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          Save Company
        </button>
      </form>
    </div>
  );
};

export default AddCompany;
