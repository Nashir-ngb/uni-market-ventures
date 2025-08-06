import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SellerNavbar from '../components/SellerNavbar';

export default function SellerProducts() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/seller/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <>
      <SellerNavbar />
      <div className="max-w-5xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">📦 Your Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow">
              <h2 className="font-semibold">{product.name}</h2>
              <p>Price: RM {product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
