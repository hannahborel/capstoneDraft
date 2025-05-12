import { useState } from "react";
import "./adminHome.css";
import UserDetails from "./UserDetails";
import ProductDetails from "./productDetails";

const AdminHome = () => {
  const [selectedPage, setSelectedPage] = useState("products");
  return (
    <div className="admin-home">
      <div className="admin-home-buttons">
        <button onClick={() => setSelectedPage("products")}>Products</button>
        <button onClick={() => setSelectedPage("users")}>Users</button>
      </div>
      {selectedPage === "products" && <ProductDetails />}
      {selectedPage === "users" && <UserDetails />}
    </div>
  );
};
export default AdminHome;
