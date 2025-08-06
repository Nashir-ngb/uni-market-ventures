import React from 'react';
import axios from 'axios';

export default function Businesses() {
  // Demo products/businesses – replace with real data or fetch from backend later
  const products = [
    { id: 'p1', name: 'D-Kampung Coffee', price: 10 },
    { id: 'p2', name: 'AIU Tailoring Service', price: 30 },
    { id: 'p3', name: 'AIU Salon', price: 25 }
  ];

  // Add to cart function
  const addToCart = async (product) => {
    try {
      await axios.post('http://localhost:5000/api/user/cart', {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      alert('✅ Added to cart!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add to cart');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Businesses & Products</h2>
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-gray-600">${product.price}</p>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
