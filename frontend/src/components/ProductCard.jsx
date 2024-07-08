import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <div className="mt-4 flex justify-between items-center">
        <Link to={`/product/${product.id}`} className="text-blue-600 hover:underline">
          View Details
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;