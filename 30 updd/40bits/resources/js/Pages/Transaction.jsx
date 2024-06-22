import React, { useState } from 'react';
import { usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';

const Transaction = ({ auth }) => {
    const { props } = usePage();
    const { selectedItems, totalPrice } = props;

    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

    const handleConfirmAndPay = async () => {
        try {
            const response = await axios.post('/save-transaction', {
                selectedItems,
                totalPrice,
                paymentMethod,
            });
    
            // Handle success (e.g., show a success message or redirect to another page)
            console.log(response.data.message);
    
            // Redirect to the dashboard
            window.location.href = route('dashboard', {
                selectedItems: selectedItems,  // Assuming selectedItems is an array or object
                totalPrice: totalPrice  // Assuming totalPrice is a number or string
            });
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error saving transaction:', error);
        }
    };
    

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Transaction" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-4">Receipt</h1>
                
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Checkout Items</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            {selectedItems.map((item, index) => (
                                <div key={index} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Product Name:</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{item.product.name}</dd>
                                    <dt className="text-sm font-medium text-gray-500">Price:</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${item.product.price}</dd>
                                </div>
                            ))}
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Total Price:</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${totalPrice}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="mb-4 mt-6 text-center">
                    <label className="block text-sm font-medium text-gray-700">
                        Select Payment Method:
                    </label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 block w-50 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mx-auto"
                    >
                        <option value="Cash on Delivery">Cash on Delivery</option>
                        <option value="Gcash">Gcash</option>
                    </select>
                </div>

                <div className="mt-4">
                    <button
                        onClick={handleConfirmAndPay}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Confirm and Pay
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Transaction;
