import TableComponent from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import "./CartPage.css";
import remove from "../../assets/remove.png";
import { useContext, useMemo, memo } from "react";
import userContext from "../../contexts/userContext";
import cartContext from "../../contexts/cartContext";
import { checkOutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";
function CartPage() {
  const userObj = useContext(userContext);

  const { cart, addToCart, removeFromCart, updateCart, setCart } =
    useContext(cartContext);
  console.log(userObj);
  const subTotal = useMemo(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }, [cart]);
  function checkout() {
    const oldCart = [...cart];
    setCart([]);
    checkOutAPI()
      .then((res) => toast.success("Order placed successfully"))
      .catch((err) => {
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
              <td>${product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${quantity * product.price}</td>
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
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subTotal + 5}</td>
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
