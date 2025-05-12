import { useState } from "react";
import "./productDetails.css";
import {
  useFetchProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../api/API";

const ProductDetails = () => {
  const { data, isLoading, isError } = useFetchProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    img_url: "",
  });

  console.log(product);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        ...product,
        price: Number(product.price),
      };
      await createProduct(productData).unwrap();
      // Clear form after successful submission
      setProduct({
        name: "",
        description: "",
        price: "",
        img_url: "",
      });
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleDelete = async (productId) => {
    console.log(productId);
    try {
      await deleteProduct(productId).unwrap();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const isAddProductDisabled =
    product.name === "" ||
    product.description === "" ||
    product.price === "" ||
    product.img_url === "";

  return (
    <div className="product-details-container-admin">
      <div className="product-details-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={product.price}
          onChange={handleInputChange}
          min="0"
          step="0.01"
          required
        />
        <input
          type="text"
          name="img_url"
          placeholder="Product Image URL"
          value={product.img_url}
          onChange={handleInputChange}
          required
        />
        <button
          onClick={handleSubmit}
          className={isAddProductDisabled ? "add-product-button-disabled" : ""}
          disabled={isAddProductDisabled}
        >
          +
        </button>
      </div>

      <div>
        <h2>Products Database</h2>
        <div className="product-container-admin">
          {data?.map((product) => (
            <div key={product.id} className="product-card-admin">
              <img
                className="product-image"
                src={product.img_url}
                alt={product.name}
              />
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
