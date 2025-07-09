import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontSize: '16px',
      '::placeholder': {
        color: '#a0aec0',
      },
    },
    invalid: {
      color: '#e53e3e',
    },
  },
};

const CardForm = ({ onPaymentMethodCreated }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) return;

//     setLoading(true);
//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     setLoading(false);

//     if (error) {
//       console.error('[Stripe Error]', error);
//       toast.error(error.message);
//     } else {
//       console.log('[PaymentMethod]', paymentMethod);
//       onPaymentMethodCreated(paymentMethod.id);
//     }
//   };


const handleSubmit = async (event) => {
  event.preventDefault();

  if (!stripe || !elements) return;

  setLoading(true);
  const cardElement = elements.getElement(CardElement);

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  setLoading(false);

  if (error) {
    console.error('[Stripe Error]', error);
    toast.error(error.message);
  } else {
    console.log('[PaymentMethod]', paymentMethod);
    onPaymentMethodCreated(paymentMethod.id); // pass to parent
  }
};


  return (
    <form className=' w-full' onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="py-2 cursor-pointer mt-8 px-4 bg-blue-500 text-white rounded"
      >
        {loading ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
};

export default CardForm;
