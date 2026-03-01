import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const OfficeCard = ({ office , mode}) => {
  const{user}= useAuth();
  const navigate= useNavigate();

 


  return (
    <div className="border border-black rounded-lg p-4 hover:shadow-lg transition">
      
      {/* Main Layout */}
      <div className="flex gap-4">
        
        {/* Left Image */}
        <div className="w-32 h-32 flex-shrink-0 border border-black rounded-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
            alt="Office"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex-1">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-lg font-semibold text-black">
                Office  : {office.officeNumber}
              </h2>
              <p className="text-xs text-gray-600 break-all">
                {office._id}
              </p>
            </div>

            <span
              className={`text-xs font-medium px-3 py-1 rounded-full border
                ${
                  office.availableStatus === "available"
                    ? "border-black text-black"
                    : "border-black bg-black text-white"
                }
              `}
            >
              {office.availableStatus}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-1 text-sm text-black">
            <p>
              <span className="font-medium">Floor:</span> {office.floor}
            </p>
            <p>
              <span className="font-medium">Capacity:</span>{" "}
              {office.capacity} people
            </p>
            <p>
              <span className="font-medium">Rent:</span>{" "}
              ₹{office.officeRent}/month
            </p>

          </div>

          {/* Button */}
          {mode === "company" &&
            office.availableStatus === "available" && (
              <button
                className="mt-4 w-full rounded-lg bg-black py-2 text-white hover:opacity-90"
                onClick={() =>
                  navigate(`${office._id}/bookoffice`)
                }
              >
                Book this office
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default OfficeCard;