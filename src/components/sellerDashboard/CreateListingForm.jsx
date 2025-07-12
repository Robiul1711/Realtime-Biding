import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ItemDetails from "./ItemDetails";
import PricingAndAuction from "./PricingAndAuction";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CreateListingForm = () => {
  const axiosSecure = useAxiosSecure();

const ProductCreateMutation = useMutation({
  mutationFn: async (formData) => {
    const response = await axiosSecure.post("/seller/product", formData /* no headers here */);
    return response.data;
  },
  onSuccess: (response) => {
    toast.success(response?.message || "Product created successfully");
  },
  onError: (error) => {
    const errorMessage =
      error.response?.data?.message || "Something went wrong, try again later!!";
    toast.error(errorMessage);
  },
});

  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const methods = useForm({
    defaultValues: {
      type: "auction",
      ship_within: 5,
      product_properties: [{ title: "", value: "" }],
    },
  });

  const handleNext = () => {
    methods.trigger().then((isValid) => {
      if (isValid) {
        if (step < totalSteps) {
          setStep((prev) => prev + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          methods.handleSubmit(onSubmit)();
        }
      }
    });
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

const onSubmit = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key !== "images" && key !== "product_properties") {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, value || "");
      }
    }
  });

  if (data.images && Array.isArray(data.images)) {
    data.images.forEach((file, index) => {
      if (file instanceof File) {
        formData.append(`images[${index}]`, file);
      }
    });
  }

  if (data.product_properties && Array.isArray(data.product_properties)) {
    data.product_properties.forEach((prop, index) => {
      formData.append(`product_prop_title[${index}]`, prop.title || "");
      formData.append(`product_prop_value[${index}]`, prop.value || "");
    });
  }
  console.log("Form Data:", formData);
  ProductCreateMutation.mutate(formData);
};

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Create Listing
        </h1>
        <p className="text-gray-600">
          Our Standard Service Plan is designed for homeowners who want a reliable and cost-effective solution
          without compromising on quality.
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
                type="submit"
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