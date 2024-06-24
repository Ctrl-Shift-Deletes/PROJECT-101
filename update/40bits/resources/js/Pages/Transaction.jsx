import React, { useState } from 'react';
import { usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';

const Transaction = ({ auth }) => {
    const { props } = usePage();
    const { selectedItems, totalPrice } = props;

    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formError, setFormError] = useState('');

    const handleConfirmAndPay = async () => {
        if (!address) {
            setFormError('Please enter your address.');
            return;
        }

        if (!phoneNumber) {
            setFormError('Please enter your cellphone number.');
            return;
        }

        try {
            const response = await axios.post('/save-transaction', {
                selectedItems,
                totalPrice,
                paymentMethod,
                address,
                phoneNumber,
            });

            console.log(response.data.message);

            window.location.href = route('dashboard', {
                selectedItems: selectedItems,
                totalPrice: totalPrice
            });
        } catch (error) {
            console.error('Error saving transaction:', error);
        }
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        // Regular expression to allow only numeric digits
        const numericValue = value.replace(/\D/g, '');
        setPhoneNumber(numericValue);
        setFormError(''); // Clear any previous error message when user starts typing
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Transaction" />
            <div className="container mx-auto px-4 py-8 flex justify-between">
                {/* Left side content */}
                <div className="w-1/2">
                    <h1 className="text-3xl font-bold text-center mb-4">Receipt</h1>

                    {formError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline"> {formError}</span>
                        </div>
                    )}

                    <div className="mb-5 mt-2 text-center">
                        <label className="text-sm font-medium text-gray-700">
                            Address:
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="mt-1 block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mx-auto"
                                style={{ width: '200px', height: '30px' }}
                            />
                        </label>
                    </div>

                    <div className="mb-4 mt-6 text-center">
                        <label className="block text-sm font-medium text-gray-700">
                            Cellphone Number:
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                pattern="[0-9]*" 
                                required 
                                className="mt-1 block w-70 px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mx-auto"
                                style={{ width: '140px', height: '30px' }}
                            />
                        </label>
                    </div>

                    <div className="mb-4 mt-6 shadow overflow-hidden sm:rounded-2xl text-center">
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
                </div>

                {/* Right side content */}
                <div className="w-1/2">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Checkout Items</h3>
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
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <button
                                        onClick={handleConfirmAndPay}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto"
                                    >
                                        Confirm and Pay
                                    </button>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Transaction;
