import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserRoutes = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;

  try {
    const decoded = jwtDecode(token);

    if (decoded.role !== "user") {
      return <Navigate to="/admin/home" replace />;
    }

    return children;
  } catch (err) {
    sessionStorage.clear();
    return <Navigate to="/" replace />;
  }
};

export default UserRoutes;
