import useData from "../../hooks/useData";

import TableComponent from "../Common/Table";
import "./MyOrderPage.css";
export default function MyOrderPage() {
  const {
    data: orders,
    errors,
    isLoading,
  } = useData("/order", null, ["myorders"], 1 * 60 * 1000);
  function getProductString(order) {
    const productStringArr = order.products.map(
      (p) => `${p.product?.title}(${p.quantity})`
    );
    return productStringArr.join(", ");
  }
  return (
    <section className="align_center myorder_page">
      {errors && <em className="form_error">{errors}</em>}
      {orders && (
        <TableComponent headings={["Order", "Products", "Total", "Status"]}>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{getProductString(order)}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </TableComponent>
      )}
    </section>
  );
}
