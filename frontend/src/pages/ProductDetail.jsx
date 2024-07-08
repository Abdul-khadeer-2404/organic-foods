import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex flex-col md:flex-row">
      <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-64 md:h-auto object-cover mb-4 md:mb-0 md:mr-6" />
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
        <p className="mb-6">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;