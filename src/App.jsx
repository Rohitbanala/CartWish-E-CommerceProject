import { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./components/Authentication/LoginPage";
import SignupPage from "./components/Authentication/SignupPage";
import CartPage from "./components/Cart/CartPage";
import HomePage from "./components/Home/HomePage";
import MyOrderPage from "./components/MyOrder/MyOrderPage";
import NavBar from "./components/Navbar/NavBar";
import ProductPage from "./components/Products/ProductPage";
import Routing from "./components/Routing/Routing";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import { jwtDecode } from "jwt-decode";
import { getUser } from "./services/userServices";
function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    try {
      const jwtuser = getUser();
      if (Date.now() > jwtuser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtuser);
      }
    } catch (err) {}
  }, []);
  return (
    <div className="app">
      <NavBar user={user} />
      <main>
        <Routing />
      </main>
    </div>
  );
}

export default App;
