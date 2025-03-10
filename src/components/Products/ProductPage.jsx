import "./ProductPage.css";
import ProductsList from "./ProductsList";
import ProductsSideBar from "./ProductsSideBar";
export default function ProductPage() {
  return (
    <section className="product_page">
      <ProductsSideBar />
      <ProductsList />
    </section>
  );
}
