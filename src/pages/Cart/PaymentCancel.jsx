import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 py-10 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-8 text-center">
        <div className="flex flex-col items-center mb-6">
          <XCircle className="w-14 h-14 text-red-600 mb-2" />
          <h1 className="text-2xl font-semibold text-red-700 mb-1">Payment Cancelled</h1>
          <p className="text-gray-600 text-sm">
            Your payment could not be completed. Please try again or return to the shop.
          </p>
        </div>

        <Link
          to="/shop"
          className="inline-block w-full py-2 px-4 bg-gray-700 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
