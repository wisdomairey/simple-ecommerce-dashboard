import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const PublicFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo size="md" theme="light" className="mb-4" />
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your premium shopping destination. Experience the future of e-commerce with 
              NexaShop's curated selection of premium products and next-generation service.
            </p>
            <div className="text-gray-400 text-sm">
              <p>© 2024 NexaShop. All rights reserved.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">
                Email: support@nexashop.com
              </li>
              <li className="text-gray-300">
                Phone: (555) 123-4567
              </li>
              <li className="text-gray-300">
                Hours: Mon-Fri 9AM-6PM EST
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Built with React, Node.js, and MongoDB. Powered by Stripe for secure payments.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
