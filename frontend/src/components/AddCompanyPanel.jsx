import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

const AddCompanyAnimation = () => {
  const [open, setOpen] = useState(false);
  const[companyName, setcompanyName]= useState("")
  const[address, setAddress]= useState("")

  async function Add(){
    await  axios.post("http://localhost:3000/addcompany", 
        {
            companyName, address

        }, {
            withCredentials:true ,
             headers:{
            "Content-Type": "application/json"
        }
        } 
    )
    if(response.status===200){
        toast("succesfully addedc comapny")
    }
  }

  return (
    <div className="relative">
      {/* Add Company Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Add Company
      </button>

      {/* Animated Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white border-l border-black p-6 z-50"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add Company</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Company Name</label>
                <input
               value={companyName}
               onChange={(e)=>setcompanyName(e.target.value)}
                  className="w-full border border-black px-3 py-2 rounded"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Address</label>
                <textarea
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                  rows="3"
                  className="w-full border border-black px-3 py-2 rounded"
                  placeholder="Enter address"
                />
              </div>

              <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={Add}>
                Save Company
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddCompanyAnimation;
