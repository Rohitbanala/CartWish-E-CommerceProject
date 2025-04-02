import TableComponent from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import "./CartPage.css";
import remove from "../../assets/remove.png";
import { useContext, useEffect, useMemo, memo, useState } from "react";
import userContext from "../../contexts/userContext";
import cartContext from "../../contexts/cartContext";
import { checkOutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";

function CartPage() {
  const userObj = useContext(userContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(cartContext);

  // Store original prices and current prices
  const [originalPrices, setOriginalPrices] = useState({});
  const [currentPrices, setCurrentPrices] = useState({});
  const [priceUpdateInProgress, setPriceUpdateInProgress] = useState(false); // Track if price update is in progress

  useEffect(() => {
    if (cart.length > 0) {
      const prices = {};
      cart.forEach((item) => {
        prices[item.product._id] = item.product.price;
      });
      setOriginalPrices(prices);
      setCurrentPrices(prices);
    }
  }, [cart]);

  // Function to decrease price randomly (100-200)
  const decreasePrice = () => {
    if (priceUpdateInProgress) return; // Don't decrease price if the update is in progress

    const updatedPrices = { ...currentPrices };

    Object.keys(updatedPrices).forEach((id) => {
      const priceDrop = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
      updatedPrices[id] = Math.max(1, updatedPrices[id] - priceDrop); // Ensure price doesn't go below 1

      toast.success(
        `Price dropped! ${
          cart.find((item) => item.product._id === id)?.product.title
        } is now $${updatedPrices[id]}`
      );
    });

    setCurrentPrices(updatedPrices);

    // Restore price after 1 hour
    setPriceUpdateInProgress(true); // Mark price update as in progress
    setTimeout(() => {
      setCurrentPrices(originalPrices);
      setPriceUpdateInProgress(false); // Price update is completed
    }, 3600000); // 1 hour in milliseconds
  };

  useEffect(() => {
    // Decrease price every 45 minutes
    const interval = setInterval(decreasePrice, 2700000); // 45 minutes in milliseconds
    return () => clearInterval(interval);
  }, [currentPrices, originalPrices, priceUpdateInProgress]);

  const subTotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + currentPrices[item.product._id] * item.quantity,
      0
    );
  }, [cart, currentPrices]);

  function checkout() {
    const oldCart = [...cart];
    setCart([]);
    checkOutAPI()
      .then(() => toast.success("Order placed successfully"))
      .catch(() => {
        toast.error("Can't process Order");
        setCart(oldCart);
      });
  }

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`http://localhost:5000/profile/${userObj?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">{userObj?.name}</p>
          <p className="user_email">{userObj?.email}</p>
        </div>
      </div>

      <TableComponent
        headings={["Item", "Price", "Quantity", "Total", "Remove"]}
      >
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${currentPrices[product._id]}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${(quantity * currentPrices[product._id]).toFixed(2)}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </TableComponent>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${(subTotal + 5).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <button className="search_button checkout_button" onClick={checkout}>
        CheckOut
      </button>
    </section>
  );
}

export default memo(CartPage);
