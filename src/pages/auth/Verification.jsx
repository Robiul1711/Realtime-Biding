import React, { useState } from "react";
import resetImage from "../../assets/images/reset.png";
import Title from "@/components/common/Title";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useEmail } from "@/hooks/useEmail";
import { BeatLoader } from "react-spinners";
const Verification = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const axiosPublic = useAxiosPublic();
  const { setResetToken } = useEmail();
  const email = user?.email;

  const OTPMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/verify-otp-password", data);
      return response?.data;
    },
    onSuccess: (response) => {
      console.log(response?.expire_token);
      toast.success(response?.message);
      setResetToken(response?.expire_token);
      console.log('auth working')
      if (response?.expire_token) {
        navigate("/new-password");
      } else {
        navigate("/sign-in");
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, try again later!";
      toast.error(errorMessage);
    },
  });

  const handleVerify = () => {
    if (!OTP || OTP.length < 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    if (!email) {
      toast.error("Email not found. Please try signing up again.");
      return;
    }

    OTPMutation.mutate({ email, otp: OTP });
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row w-full">
      {/* Left */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10 md:py-0">
        <div className="w-full max-w-md md:w-[65%]">
          <h2 className="text-xl md:text-[32px] font-semibold mb-6 md:mb-8 text-[#363636]">
            Enter the verification code
          </h2>
          <p className="text-[#4B5563] text-sm md:text-[17px] mb-6">
            We sent a code to{" "}
            <span className="text-[#001767] font-semibold">
              {email
                ? email.replace(
                    /(.{2})(.*)(?=@)/,
                    (_, a, b) => `${a}${"*".repeat(b.length)}`
                  )
                : "your email"}
            </span>
          </p>

          <div className="flex justify-center">
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={4}
              otpType="number"
              disabled={false}
              secure
              inputStyles={{
                width: "3rem",
                height: "3rem",
                margin: "0 0.5rem",
                fontSize: "1.5rem",
                borderRadius: "0.5rem",
                border: "2px solid #d1d5db",
                textAlign: "center",
                outline: "none",
              }}
              focusStyles={{
                border: "2px solid #3b82f6",
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
              }}
              className="otp-input-container text-center"
            />
          </div>

          {/* Display the OTP value (optional, for debugging) */}
          {/* <div className="text-center mt-4">
            <p className="text-gray-700">
              <span className="font-semibold">Entered OTP:</span> {OTP}
            </p>
          </div> */}

          <button
            onClick={handleVerify}
            className="bg-[#001767] text-white py-2 md:py-3 rounded-3xl w-full  hover:bg-[#001787] transition-all duration-300 text-sm font-medium cursor-pointer mt-6"
          >
            {OTPMutation?.isPending ? (
              <BeatLoader
                loading={OTPMutation?.isPending}
                color="white"
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="bg-[#001767] w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-10 md:py-0">
        <Title level="title48" className="mb-2 text-white ml-0 lg:ml-8 xl:ml-0">
          Welcome Back! Bid & Win with <br className="hidden xl:block" />
          Your Community.
        </Title>
        <p className="my-6 text-[#CDCDCD] w-full max-w-xl">
          Glad to have you back! Browse new listings, connect with traders, and
          swap items easily. Log in to continue your trading journey!
        </p>
        <div className="mt-4 w-full max-w-[620px]">
          <img
            src={resetImage}
            alt="Reset Visual"
            className="w-full h-auto object-contain rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Verification;
