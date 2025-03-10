import LinkWithIcon from "../Navbar/LinkWithIcon";
import rocket from "../../assets/rocket.png";
import "./ProductsSideBar.css";
export default function ProductsSideBar() {
  return (
    <aside className="product_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        <LinkWithIcon
          title="Electronics"
          link="products?category=electronics"
          emoji={rocket}
          sidebar={true}
        />
      </div>
    </aside>
  );
}
