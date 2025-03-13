import ProductCard from "./ProductCard";
import "./ProductsList.css";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCartSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination";
import { useEffect, useState } from "react";
export default function ProductsList() {
  const [page, setPages] = useState(1);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");

  const {
    data,
    errors: error,
    isLoading,
  } = useData(
    "/products",
    {
      params: {
        category,
        page,
      },
    },
    [category, page]
  );
  useEffect(() => {
    setPages(1);
  }, [category]);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  function handleChange() {
    const currentParms = Object.fromEntries([...search]);
    setSearch({ ...currentParms, page: parseInt(currentParms.page) + 1 });
  }
  useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoading &&
        data &&
        page < data.totalPages
      ) {
        setPages((prev) => prev + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isLoading]);
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
            <ProductCard key={product._id} product={product} />
          ))}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
      </div>
      {/* <Pagination
        totalPosts={data?.totalProducts}
        postsPerPage={8}
        onClick={handleChange}
        currentPage={page}
      /> */}
    </section>
  );
}
