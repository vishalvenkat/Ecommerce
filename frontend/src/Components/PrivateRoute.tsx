import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  return <div>{userInfo ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default PrivateRoute;
