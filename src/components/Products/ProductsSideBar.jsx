import LinkWithIcon from "../Navbar/LinkWithIcon";
import "./ProductsSideBar.css";
import useData from "../../hooks/useData";
export default function ProductsSideBar() {
  const { data: categories, errors } = useData(
    "/category",
    null,
    ["categories"],
    24 * 60 * 60 * 1000
  );
  return (
    <aside className="product_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {errors && <em className="form_error">{errors}</em>}
        {categories?.map((category) => (
          <LinkWithIcon
            key={category._id}
            title={category.name}
            link={`/products?category=${category.name}`}
            emoji={`http://localhost:5000/category/${category.image}`}
            sidebar={true}
          />
        ))}
      </div>
    </aside>
  );
}
