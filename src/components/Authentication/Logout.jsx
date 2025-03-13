import { useEffect } from "react";
import { logout } from "../../services/userServices";

export default function Logout() {
  useEffect(() => {
    logout();
    window.location = "/";
  }, []);
  return null;
}
