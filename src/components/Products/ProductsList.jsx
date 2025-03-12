import ProductCard from "./ProductCard";
import "./ProductsList.css";
import useData from "../../hooks/useData";
export default function ProductsList() {
  const { data, errors: error } = useData("/products");
  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">Relevance</option>
          <option value="price desc">PRICE HIGH TO LOW</option>
          <option value="price asc">PRICE LOW TO HIGH</option>
          <option value="price asc">RATE LOW TO HIGH</option>
          <option value="price desc">RATE HIGH TO LOW</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {data?.products &&
          data?.products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.images[0]}
              price={product.price}
              title={product.title}
              rating={product.reviews.rate}
              ratingCounts={product.reviews.count}
              stock={product.stock}
            />
          ))}
      </div>
    </section>
  );
}
