import React from 'react';

const CheckoutSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="card">
            <div className="card-body py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Order Successful!
              </h1>
              
              <p className="text-gray-600 mb-8">
                Thank you for your purchase. You will receive an email confirmation shortly.
              </p>
              
              <div className="space-y-4">
                <a href="/products" className="btn btn-primary">
                  Continue Shopping
                </a>
                <a href="/" className="btn btn-outline ml-4">
                  Go Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
