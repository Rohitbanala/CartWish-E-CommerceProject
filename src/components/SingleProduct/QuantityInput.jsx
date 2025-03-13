import "./QuantityInput.css";
export default function QuantityInput({
  quantity,
  setQuantity,
  stock,
  cartPage,
  productId,
}) {
  return (
    <>
      <button
        className="quantity_input_button"
        onClick={
          cartPage
            ? () => setQuantity("-", productId)
            : () => setQuantity(quantity - 1)
        }
        disabled={quantity <= 1}
      >
        -
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        className="quantity_input_button"
        onClick={
          cartPage
            ? () => setQuantity("+", productId)
            : () => setQuantity(quantity + 1)
        }
        disabled={quantity >= stock}
      >
        +
      </button>
    </>
  );
}
