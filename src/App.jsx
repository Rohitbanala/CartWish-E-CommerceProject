import { useCallback, useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import Routing from "./components/Routing/Routing";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";

import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import userContext from "./contexts/userContext";
import cartContext from "./contexts/cartContext";
import "react-toastify/dist/ReactToastify.css";
import useData from "./hooks/useData";

setAuthToken(getJwt());

function App() {
  const [user, setUser] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtuser = getUser();
      console.log(jwtuser);
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
  const addToCart = useCallback(
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
    },
    [cart]
  );
  const getCart = useCallback(
    function getCart() {
      getCartAPI()
        .then((res) => setCart(res.data))
        .catch((err) => toast.error("Unable to get Cart Details"));
    },
    [user]
  );
  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);
  const removeFromCart = useCallback(
    function removeFromCart(id) {
      const oldCart = [...cart];
      const newCart = oldCart.filter((item) => item.product._id !== id);
      setCart(newCart);
      removeFromCartAPI(id)
        .then((res) => toast.success("Removed item successfully"))
        .catch((err) => {
          toast.error("Unable to delete item.");
          setCart(oldCart);
        });
    },
    [cart]
  );
  const updateCart = useCallback(
    function updateCart(type, id) {
      const oldCart = [...cart];
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );
      if (type === "+") {
        updatedCart[productIndex].quantity += 1;
        setCart(updatedCart);
        increaseProductAPI(id).catch((err) => {
          toast.error("can't increase");
          setCart(oldCart);
        });
      }
      if (type === "-") {
        updatedCart[productIndex].quantity -= 1;
        setCart(updatedCart);
        decreaseProductAPI(id).catch((err) => {
          toast.error("can't decrease");
          setCart(oldCart);
        });
      }
    },
    [cart]
  );
  return (
    <userContext.Provider value={user}>
      <cartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
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
