import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

// Load Stripe with your publishable key
const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await axios.post('http://localhost:3001/payment', {
        payment_method: {
          card: cardElement,
        },
        currency: 'usd',
        amount: 1000, // Amount in cents (e.g., $10)
      });

      if (response.status === 200) {
        // Payment success, you can redirect or display a success message
        console.log('Payment successful');
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while processing your payment.');
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Payment Form</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
        <div className="mb-3">
          <label htmlFor="card-element" className="form-label">
            Card Information
          </label>
          <CardElement className="form-control" />
        </div>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <button type="submit" className="btn btn-default bg-primary text-white w-100" disabled={!stripe || loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Pay $200'}
        </button>
      </form>
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentPage;
