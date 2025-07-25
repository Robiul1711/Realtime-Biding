import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ItemDetails from "./ItemDetails";
import PricingAndAuction from "./PricingAndAuction";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateListingForm = () => {
  const axiosSecure = useAxiosSecure();
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      type: "auction",
      ship_within: 5,
      product_properties: [{ title: "", value: "" }],
      buy_now: "no",
    },
    mode: "onChange", // Changed to onChange for better UX
  });

  const ProductCreateMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecure.post("/seller/product", formData);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response?.message || "Product created successfully");
      navigate("/seller-dashboard/my-auction");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, try again later!!";
      toast.error(errorMessage);
    },
  });

  const handleNext = async () => {
    // Only validate fields in the current step
    let isValid = true;
    if (step === 1) {
      isValid = await methods.trigger(
        [
          "images",
          "title",
          "description",
          "care_guide",
          "category_id",
          "subcategory_id",
        ],
        { shouldFocus: true }
      );
    }

    if (isValid) {
      if (step < totalSteps) {
        setStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append simple fields
    const simpleFields = [
      "title",
      "description",
      "care_guide",
      "category_id",
      "subcategory_id",
      "city",
      "country",
      "address",
      "ship_within",
    ];

    simpleFields.forEach((field) => {
      if (data[field] !== undefined) {
        formData.append(field, data[field]);
      }
    });

    // Handle auction-specific fields
    if (data.starting_price) {
      formData.append("starting_price", data.starting_price);
    }
    if (data.price) {
      formData.append("price", data.price);
    }

    if (data.auction_end_at) {
      formData.append("auction_end_at", data.auction_end_at);
    }

    // Handle buy now price if enabled
    if (data.buy_now === "yes" && data.buy_now_price) {
      formData.append("buy_now_price", data.buy_now_price);
    }
    formData.append("type", data.type);

    // Append images
    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`images[${index}]`, file);
        } else if (file.url) {
          formData.append(`images[${index}]`, file.url);
        }
      });
    }

    // Append product properties
    if (data.product_properties && Array.isArray(data.product_properties)) {
      data.product_properties.forEach((prop, index) => {
        if (prop.title && prop.value) {
          formData.append(`product_prop_title[${index}]`, prop.title);
          formData.append(`product_prop_value[${index}]`, prop.value);
        }
      });
    }

    // For debugging - log the form data before submission
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    ProductCreateMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Create Listing
        </h1>
        <p className="text-gray-600">
          Our Standard Service Plan is designed for homeowners who want a
          reliable and cost-effective solution without compromising on quality.
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 space-y-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-4">
            {step === 1 ? "Item Details" : "Pricing & Auction"}
          </h2>

          {step === 1 && <ItemDetails />}
          {step === 2 && <PricingAndAuction />}

          <div className="flex flex-col w-full sm:flex-row justify-between gap-4 pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="px-6 w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Back
            </button>

            {step === totalSteps ? (
              <button
                type="button" // Changed from submit to button
                onClick={methods.handleSubmit(onSubmit)} // Explicitly call submit handler
                disabled={ProductCreateMutation.isPending}
                className="px-6 w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
              >
                {ProductCreateMutation.isPending ? "Submitting..." : "Submit"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateListingForm;
