import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-6">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b py-2">
                <span>{item.name} - ${item.price.toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="text-xl font-bold mb-6">Total: ${total.toFixed(2)}</div>
          <Link
            to="/checkout"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
}

export default CartPage;