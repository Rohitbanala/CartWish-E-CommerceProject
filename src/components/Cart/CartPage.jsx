import user from "../../assets/user.webp";
import TableComponent from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import "./CartPage.css";
import remove from "../../assets/remove.png";
import { useEffect, useState, useContext } from "react";
import userContext from "../../contexts/userContext";
import cartContext from "../../contexts/cartContext";
export default function CartPage() {
  const [subTotal, setSubTotal] = useState(0);
  const userObj = useContext(userContext);
  const { cart, addToCart } = useContext(cartContext);
  console.log(userObj);
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total);
  }, [cart]);
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
                <QuantityInput quantity={quantity} stock={product.stock} />
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
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
      <button className="search_button checkout_button">CheckOut</button>
    </section>
  );
}
