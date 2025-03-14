import "./NavBar.css";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import lock from "../../assets/package.png";
import order from "../../assets/basket.png";
import LinkWithIcon from "./LinkWithIcon";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import userContext from "../../contexts/userContext";
import cartContext from "../../contexts/cartContext";
export default function NavBar() {
  const user = useContext(userContext);
  const { cart, addToCart } = useContext(cartContext);
  const cartCount = cart.length;
  return (
    <div className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">CartWish</h1>
        <form className="align_center navbar_form">
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
          />
          <button type="submit" className="search_button">
            Search
          </button>
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
