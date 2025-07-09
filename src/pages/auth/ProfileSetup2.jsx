import React from "react";
import image from "../../assets/images/logo.png";
import image1 from "../../assets/images/signup.png";
import { Link, ScrollRestoration } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardForm from "./CardForm";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const ProfileSetup2 = () => {
  const axiosSecure = useAxiosSecure();
  const handlePaymentMethodCreated = (paymentMethodId) => {
    console.log("Received payment method ID:", paymentMethodId);
    addCardMutation.mutate(paymentMethodId);
  };

  const addCardMutation = useMutation({
  mutationFn: async (paymentMethodId) => {
    const response = await axiosSecure.post("/stripe/card/add", {
      payment_method_id: paymentMethodId,
    });
    return response.data;
  },
  onSuccess: (response) => {
    toast.success("Card added successfully!");
    // Optionally continue with other logic (e.g., profile setup)
  },
  onError: (error) => {
    console.log("Stripe Card Error:", error);
    toast.error("Failed to save card.");
  },
});

  return (
    <div className="min-h-screen flex items-center justify-center section-padding-x">
      <ScrollRestoration />
      <div className="w-full flex flex-col lg:flex-row justify-between ">
        {/* Left Content */}
        <div className="p-4 lg:p-16 flex flex-col justify-center w-full lg:w-[60%]">
          <h2 className="text-2xl md:text-5xl font-bold text-[#363636] md:leading-16 lg:leading-20 mb-2">
            Welcome Back! Bid & Win with <br className="hidden xl:block" /> Your
            Community.
          </h2>
          <p className="text-[#4B5563] text-sm md:text-[17px] mb-6 lg:mb-12">
            Glad to have you back! Browse new listings, connect with traders,
            and swap items easily. Log in to continue your trading journey!
          </p>

          <img
            src={image1}
            alt="Sign In Illustration"
            className="w-full h-[300px] lg:h-full object-cover"
          />
        </div>

        {/* Right Form */}
          <div className="p-4 lg:p-12 bg-[#001767] mt-auto rounded-lg text-white xl:mt-[300px] h-full w-full md:flex-1">
            <Elements stripe={stripePromise}>
              <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Enter Card Info</h2>
                <CardForm onPaymentMethodCreated={handlePaymentMethodCreated} />
              </div>
            </Elements>
          </div>
      </div>
    </div>
  );
};

export default ProfileSetup2;
