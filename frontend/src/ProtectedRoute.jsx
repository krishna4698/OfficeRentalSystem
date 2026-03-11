
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, role , approvalStatus}) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white">Loading...</div>;

  if (!user) return <Navigate to="/" replace />;

  // if(user.role==="admin" && user.approvalStatus!="approved"){
  //   return <Navigate to={"/register"}/>
  //    toast("neeed approval")

  // }

  if (role && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/company/dashboard"} replace />;
  }
  
  return children;  
};

export default ProtectedRoute;  
