import { useState } from 'react';
import ItemDetails from './ItemDetails';
import PricingAndAuction from './PricingAndAuction';

const CreateListingForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 2; // Update if you add more steps

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Listing</h1>
        <p className="text-gray-600">
          Our Standard Service Plan is designed for homeowners who want a reliable and cost-effective solution
          without compromising on quality.
        </p>
      </div>

      <form className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 space-y-8">
        <h2 className="text-lg font-semibold text-gray-900 border-b pb-4">
          {step === 1 ? 'Item Details' : 'Pricing & Auction'}
        </h2>

        {/* Step content */}
        {step === 1 && <ItemDetails />}
        {step === 2 && <PricingAndAuction />}

        {/* Action Buttons */}
        <div className="flex flex-col w-full sm:flex-row justify-between gap-4 pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="px-6 w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="px-6 w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {step === totalSteps ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingForm;

