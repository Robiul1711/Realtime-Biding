import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();

    console.log(cart)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <Link
            to="/shop"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0 p-4"
                >
                  <div className="sm:w-1/3 mb-4 sm:mb-0">
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}${item.images[0]}`}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  <div className="sm:w-2/3 sm:pl-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        From {item.country}
                      </p>
                      <p className="text-lg font-semibold">${item.price}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 size={18} />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={clearCart}
              className="mt-4 text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
            >
              <Trash2 size={16} />
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>
                    Subtotal (
                    {cart.reduce((total, item) => total + item.quantity, 0)}{" "}
                    items)
                  </span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </button>
              <Link
                to="/shop"
                className="block text-center text-blue-600 mt-4 text-sm hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
