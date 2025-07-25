import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const PaymentSuccess = () => {
  const { cart, clearCart } = useCart(); // ⬅️ get clearCart
  console.log(cart);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-8 text-center">
        <div className="flex flex-col items-center mb-6">
          <CheckCircle2 className="w-14 h-14 text-green-600 mb-2" />
          <h1 className="text-2xl font-semibold text-green-700 mb-1">Payment Successful</h1>
          <p className="text-gray-600 text-sm">
            Thank you for your purchase! You're now enrolled.
          </p>
        </div>

        <Link
          to="/"
          onClick={() => {
            clearCart(); // ✅ clear in realtime
          }}
          className="inline-block w-full py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
        >
          Go to Website
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
