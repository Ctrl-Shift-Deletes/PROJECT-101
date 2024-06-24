import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react'; // Import Link from inertiajs/react

function Receipt() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    axios.get('/transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">Shipment</h2>
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map(transaction => (
              transaction.id % 2 === 0 ? (
                <tr key={transaction.id} className="bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap border">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap border">{transaction.total_price}</td>
                  <td className="px-6 py-4 whitespace-nowrap border">{transaction.payment_method}</td>
                  <td className="px-6 py-4 whitespace-nowrap border">{transaction.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap border">{transaction.phone_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap border">{transaction.created_at}</td>
                </tr>
              ) : null
            ))}
          </tbody>

        </table>

        {/* Dashboard Link */}
        <div className="flex justify-center mt-2">
          <Link href={route('dashboard')} passHref>
            <a className="px-4 py-2 bg-green-400 hover:bg-green-500 rounded-lg text-white font-semibold inline-block">
              Dashboard
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
