import TableComponent from "../Common/Table";
import "./MyOrderPage.css";
export default function MyOrderPage() {
  return (
    <section className="align_center myorder_page">
      <TableComponent headings={["Order", "Products", "Total", "Status"]}>
        <tbody>
          <tr>
            <td>1</td>
            <td>iPhone 14, Power Bank</td>
            <td>$1299</td>
            <td>Shipped</td>
          </tr>
        </tbody>
      </TableComponent>
    </section>
  );
}
