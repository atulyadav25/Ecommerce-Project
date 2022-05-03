import React  from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import Dashboard from "../Admin/Dashboard";

const ProtectedRoute = ({element: Component}) => {
  const { user } = useSelector((state) => state.user);



  const isAdmin = user.role === "admin"?true:false



    return isAdmin ? <Component /> :( <Navigate to="/login" />)
};

export default ProtectedRoute;