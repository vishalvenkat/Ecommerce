import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <div>
      {userInfo && userInfo.isAdmin ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace />
      )}
    </div>
  );
};

export default AdminRoute;
// This component checks if the user is logged in and is an admin.
// If so, it renders the child components; otherwise, it redirects to the login page.
// This is useful for protecting admin routes in your application.
