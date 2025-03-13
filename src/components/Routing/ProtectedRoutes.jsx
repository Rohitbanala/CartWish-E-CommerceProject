import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser } from "../../services/userServices";
import LoginPage from "../Authentication/LoginPage";

export function ProtectedRouters() {
  const location = useLocation();
  return getUser() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
}
