import "./NavBar.css";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import lock from "../../assets/package.png";
import order from "../../assets/basket.png";
import LinkWithIcon from "./LinkWithIcon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import userContext from "../../contexts/userContext";
import cartContext from "../../contexts/cartContext";
import { getSuggestionsAPI } from "../../services/productServices";
export default function NavBar() {
  const user = useContext(userContext);
  const { cart, addToCart } = useContext(cartContext);
  const [suggestions, setSuggestion] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const cartCount = cart.length;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    if (search.trim() != "") {
      navigate(`products?search=${search}`);
    }
    setSuggestion([]);
  }
  function handleKeyDown(e) {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((curr) => {
          return curr === suggestions.length ? 0 : curr + 1;
        });
      } else if (e.key === "ArrowUp") {
        setSelectedItem((curr) => {
          return curr === 0 ? suggestions.length - 1 : curr - 1;
        });
      } else if (e.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestion([]);
      }
    } else {
      setSelectedItem(-1);
    }
  }
  useEffect(() => {
    const delaySuggestions = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsAPI(search)
          .then((res) => setSuggestion(res.data))
          .catch((err) => console.log(err));
      }
      setSuggestion([]);
    }, 300);
    return () => clearTimeout(delaySuggestions);
  }, [search]);

  return (
    <div className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">CartWish</h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="search_button">
            Search
          </button>
          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setSuggestion([]);
                      setSearch(``);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithIcon title="Home" link="/" emoji={rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={star} />
        {!user && (
          <>
            <LinkWithIcon title="LogIn" link="/login" emoji={idButton} />
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
          </>
        )}
        {user && (
          <>
            <LinkWithIcon title="MyOrders" link="/myorders" emoji={order} />
            <LinkWithIcon title="LogOut" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cartCount}</p>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}
