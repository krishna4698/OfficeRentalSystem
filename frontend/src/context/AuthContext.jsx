
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
// import api from "../api/axios";
import API from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)


  const checkAuth = async () => {
    try {
      const res = await axios.get(`${API}/auth/me`,{withCredentials:true})
      console.log("response", res);

   
      
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  // const logout= async (req,res)=>{
  //   await  axios.post("${API}/auth/logout", {withCredentials:true})
  // }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading , checkAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
   
        