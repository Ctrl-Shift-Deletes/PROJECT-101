import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Receipt() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('/transactions') // Make sure this matches your Laravel route
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
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
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.total_price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.payment_method}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.phone_number}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Receipt;
