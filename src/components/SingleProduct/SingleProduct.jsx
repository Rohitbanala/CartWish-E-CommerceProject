import { useParams } from "react-router-dom";
import QuantityInput from "./QuantityInput";
import "./SingleProduct.css";
import { useContext, useState } from "react";
import useData from "../../hooks/useData";
import cartContext from "../../contexts/cartContext";

export default function SingleProduct() {
  const [selectedImage, setSelectedImage] = useState(0);
  const { cart, addToCart } = useContext(cartContext);
  function imageHandler(imageIndex) {
    setSelectedImage(imageIndex);
  }
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data: product, errors, isLoading } = useData(`/products/${id}`);
  return (
    <section className="align_center single_product">
      {errors && <em className="form_error">{errors}</em>}
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/products/${image}`}
                  alt={image.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => imageHandler(index)}
                />
              ))}
            </div>
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>
            <h2 className="quantity_title">Quantity:</h2>
            <div className="align_center quantity_input">
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                stock={product.stock}
              />
            </div>
            <button
              className="search_button add_cart"
              onClick={() => {
                addToCart(product, quantity);
              }}
            >
              Add to cart
            </button>
          </div>
        </>
      )}
    </section>
  );
}
