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
function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <Routing />
      </main>
    </div>
  );
}

export default App;
