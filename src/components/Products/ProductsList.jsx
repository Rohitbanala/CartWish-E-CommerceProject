import ProductCard from "./ProductCard";
import "./ProductsList.css";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCartSkeleton";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useProducuList from "../../hooks/useProductList";
export default function ProductsList() {
  const [page, setPages] = useState(1);
  const [search, setSearch] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const category = search.get("category");
  const searchQuery = search.get("search");
  const {
    data,
    errors: error,
    isLoading,
  } = useProducuList(
    "/products",
    {
      params: {
        search: searchQuery,
        category,
        page,
      },
    },
    [searchQuery, category, page]
  );
  useEffect(() => {
    setPages(1);
  }, [category, searchQuery]);
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
  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];
      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);
  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">PRICE HIGH TO LOW</option>
          <option value="price asc">PRICE LOW TO HIGH</option>
          <option value="rate asc">RATE LOW TO HIGH</option>
          <option value="rate desc">RATE HIGH TO LOW</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {data?.products &&
          sortedProducts.map((product) => (
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
