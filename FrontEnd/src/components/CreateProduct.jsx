import { useState } from "react";
import { useCreateProductMutation } from "../api/API";


const CreateProduct = () => {
    const [createProduct] = useCreateProductMutation();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        img_url: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(formData);
            setFormData({
                name: "",
                description: "",
                price: 0,  
                img_url: "",
            });
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };
    
    return (
        <section>
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Product Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
                type="number"
                placeholder="Product Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <input
                type="text"
                placeholder="Product Image URL"
                value={formData.img_url}
                onChange={(e) => setFormData({ ...formData, img_url: e.target.value })}
            />
            <button type="submit">Create Product</button>
            </form>
        </section>
    );
};

export default CreateProduct;
