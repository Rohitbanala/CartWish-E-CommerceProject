import "./App.css";
import CartPage from "./components/Cart/CartPage";
import HomePage from "./components/Home/HomePage";
import MyOrderPage from "./components/MyOrder/MyOrderPage";
import NavBar from "./components/Navbar/NavBar";
import ProductPage from "./components/Products/ProductPage";
import SingleProduct from "./components/SingleProduct/SingleProduct";
function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        {/* <HomePage /> */}
        {/* <ProductPage /> */}
        {/* <SingleProduct /> */}
        {/* <CartPage /> */}
        <MyOrderPage />
      </main>
    </div>
  );
}

export default App;
