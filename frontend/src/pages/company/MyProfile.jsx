import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios';

 function MyProfile() {
    // const [company, setCompany] = useState({});
    const [profile, setProfile] = useState({});
 const {user}= useAuth();


 useEffect(()=>{

    const fetchcompany= async ()=>{
    try{
      //  const response= await axios.get("http://localhost:3000/mycompany", {withCredentials:true})
       const response= await axios.get("http://localhost:3000/auth/me", {withCredentials:true})
       console.log(response.data[0]);
       
          if(response.status==200) {
            setCompany(response.data[0]);
          }
        }
       catch(e){
        res.json(e);
        }
     }
     fetchcompany()

 },[])
      
   
          
  return (
    <div>
       <h1>Profile</h1>
       <h1>{user.name}</h1>
       <h1>{user.email}</h1>

       {/* <h1>Your company Details</h1>
         <p>{company.companyName}</p>
         <p>{company.address}</p> */}

    </div>
  )
}

export default MyProfile


// import React from "react";

// function getInitials(name) {
//   if (!name) return "U";
//   const parts = name.trim().split(" ");
//   return parts
//     .slice(0, 2)
//     .map((p) => p[0]?.toUpperCase())
//     .join("");
// }

// export default function MyProfilePage({
//   user = { name: "John Doe", email: "john@example.com" },
//   company = { companyName: "Acme Corp", address: "New York, USA" },
// }) {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl sm:text-4xl font-semibold text-black">
//             My Profile
//           </h1>
//           <div className="mt-4 h-px w-full bg-gray-200" />
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* User Card */}
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-6 sm:p-8">
//             <div className="flex items-center gap-4 mb-6">
//               <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-semibold">
//                 {getInitials(user?.name)}
//               </div>
//               <h2 className="text-xl font-semibold text-black">
//                 User Information
//               </h2>
//             </div>

//             <div className="space-y-5">
//               <div className="flex justify-between items-start border-b border-gray-100 pb-3">
//                 <span className="text-sm text-gray-500">Name</span>
//                 <span className="text-black font-medium text-right">
//                   {user?.name || "-"}
//                 </span>
//               </div>

//               <div className="flex justify-between items-start">
//                 <span className="text-sm text-gray-500">Email</span>
//                 <span className="text-black font-medium text-right">
//                   {user?.email || "-"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Company Card */}
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-6 sm:p-8">
//             <h2 className="text-xl font-semibold text-black mb-6">
//               Company Details
//             </h2>

//             <div className="space-y-5">
//               <div className="flex justify-between items-start border-b border-gray-100 pb-3">
//                 <span className="text-sm text-gray-500">Company Name</span>
//                 <span className="text-black font-medium text-right">
//                   {company?.companyName || "-"}
//                 </span>
//               </div>

//               <div className="flex justify-between items-start">
//                 <span className="text-sm text-gray-500">Address</span>
//                 <span className="text-black font-medium text-right max-w-[60%]">
//                   {company?.address || "-"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
