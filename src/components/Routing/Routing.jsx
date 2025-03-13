import { Routes, Route } from "react-router-dom";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import CartPage from "../Cart/CartPage";
import HomePage from "../Home/HomePage";
import MyOrderPage from "../MyOrder/MyOrderPage";

import ProductPage from "../Products/ProductPage";
import SingleProduct from "../SingleProduct/SingleProduct";
import Logout from "../Authentication/Logout";
import { ProtectedRouters } from "./ProtectedRoutes";
export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/products" element={<ProductPage />}></Route>
      <Route path="/product/:id" element={<SingleProduct />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route element={<ProtectedRouters />}>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/myorders" element={<MyOrderPage />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Route>
    </Routes>
  );
}
