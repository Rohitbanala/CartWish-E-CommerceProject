import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import Routing from "./components/Routing/Routing";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI, getCartAPI } from "./services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import userContext from "./contexts/userContext";
import cartContext from "./contexts/cartContext";
import "react-toastify/dist/ReactToastify.css";

setAuthToken(getJwt());

function App() {
  const [user, setUser] = useState("");
  const [cart, setCart] = useState([]);
  useEffect(() => {
    try {
      const jwtuser = getUser();
      if (Date.now() > jwtuser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtuser);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  function addToCart(product, quantity) {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product, quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product added Successfully!");
      })
      .catch((err) => {
        toast.error("Adding Product Failed");
        setCart(cart);
      });
  }
  function getCart() {
    getCartAPI()
      .then((res) => setCart(res.data))
      .catch((err) => toast("Unable to get Cart Details"));
  }
  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);
  return (
    <userContext.Provider value={user}>
      <cartContext.Provider value={{ cart, addToCart }}>
        <div className="app">
          <NavBar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </cartContext.Provider>
    </userContext.Provider>
  );
}

export default App;
