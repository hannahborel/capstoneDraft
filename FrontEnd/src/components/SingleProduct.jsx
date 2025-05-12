import { useParams } from "react-router-dom";
import React from "react";
import { useFetchSingleProductQuery } from "../api/API";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    if (!id) {
        return (
            <section>
                <h2>Invalid Product ID</h2>
                <p>No product ID provided.</p>
                <Link to="/products">Return to Products</Link>
            </section>
        );
    }

    const { data, isLoading, isError, error } = useFetchSingleProductQuery(id);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (isLoading) {
        return (
            <section>
                <h2>Loading...</h2>
            </section>
        );
    }

    if (isError) {
        return (
            <section>
                <h2>Error loading product</h2>
                <p>Error details: {error?.data?.message || error?.message || 'Unknown error'}</p>
                <Link to="/products">Return to Products</Link>
            </section>
        );
    }

    if (!data) {
        return (
            <section>
                <h2>No product found</h2>
                <Link to="/products">Return to Products</Link>
            </section>
        );
    }

    return (
        <section className="single-product-card">
            <img src={data.img_url} alt={data.name} />
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <p className="price">${data.price}</p>
            <div className="product-buttons">
                {/* <Link to="/products">
                    <button className="Details-button">Back to Products</button>
                </Link> */}
                {/* <Link to={`/products/${data.id}/edit`}>
                    <button className="edit-button">Edit</button>
                </Link> */}
                <button 
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(data)}>Add to Cart</button>
            </div>
        </section>
    );
};

export default SingleProduct;