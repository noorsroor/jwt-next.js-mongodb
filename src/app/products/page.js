"use client";

import axios from "axios";
import { useState } from "react";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/products", newProduct);
      setProducts((prevProducts) => [...prevProducts, data.product]);
      setNewProduct({ name: "", description: "", price: "", image: "" }); // reset form
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  const handleUpdateProduct = async (id) => {
    const updatedProduct = { ...newProduct }; // Use your form or logic to get updated data
    console.log(updatedProduct)
    try {
      const { data } = await axios.put(`/api/products/${id}`, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === id ? data.product : product))
      );
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  // Load products on mount
  useState(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🛍️ Products</h1>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 mb-2"
        />
        <input
          type="text"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-2 mb-2"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-2 mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="border p-2 mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
      </form>

      {/* Product List */}
      <ul className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product._id} className="bg-white p-4 rounded shadow">
            <img src={product.image} className="size-40" alt={product.name} />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
            <p className="text-gray-700">{product.description}</p>
            <div className="mt-2">
              <button
                onClick={() => handleUpdateProduct(product._id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
