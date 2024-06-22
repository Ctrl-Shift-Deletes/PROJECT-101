import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

function Receipt() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('/transactions')
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    }, []);

    return (
        <div className="container mx-auto px-4  py-8">
            <Link href={route('dashboard')} passHref>
                <a className="absolute top-2 pl-2 pt-2 left-3 px-4 py-2 bg-yellow-500 hover:bg-blue-500 rounded-lg">
                    <span className="absolute inset-0"></span>
                    <span className="relative z-10">Dashboard</span>
                </a>
            </Link>
            <h2 className="text-2xl font-bold pt-8 mb-4">Transaction History</h2>
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
