import axios from "axios";
import React, { useEffect, useState } from "react";
import OfficeCard from "../../components/OfficeCard";
import { useAuth } from "../../context/AuthContext";
import OfficeFilter from "../../components/OfficeFilter";
import Pagination from "../../components/Pagination";

function BrowseOffices() {
  const{user}= useAuth();
  const [offices, setOffices] = useState([]);
  const[page, setPage]=useState(1);
  const[pages,setPages]=useState(1)
  const[filter, setFilter]=useState({
    minCapacity:"",
    maxPrice:""
  })

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/alloffices", {
            params:{
              limit:5,
              page,
              ...filter
            }, withCredentials:true
          }   )
        console.log(res.data);
        

        setOffices(res.data.data);
        setPages(res.data.pages)
      } catch (e) {
        console.error("Failed to fetch offices", e);
      }
    };

    fetchOffices();
  }, [filter, page]);

  return (
    
  <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 lg:px-12">
    
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-5">
      
      {/* LEFT: FILTER */}
      <div className="lg:col-span-1 lg:sticky lg:top-6 h-fit">
        <OfficeFilter filter={filter} setFilter={setFilter} />
      </div>

      {/* RIGHT: OFFICES */}
      <div className="lg:col-span-4">
        <div className="flex flex-col gap-6">
          {offices.map((office) => (
            <OfficeCard
              key={office._id}
              office={office}
              mode={user.role}
            />
          ))}
        </div>
         <Pagination page={page} pages={pages} onPageChange={setPage}/>
      </div>
     

    </div>
  </div>
);

;
}

export default BrowseOffices;
