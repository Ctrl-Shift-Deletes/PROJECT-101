import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const AddCart = ({ auth }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
        axios.get('/cart-items')
            .then(response => {
                setCartItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    };

    const handleCheckboxChange = (itemId) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    selected: !item.selected
                };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        updateTotalPrice(updatedCartItems);
    };

    const updateTotalPrice = (updatedCartItems) => {
        const selectedItems = updatedCartItems.filter(item => item.selected);
        const newTotalPrice = selectedItems.reduce((total, item) => total + parseFloat(item.product.price), 0);
        setTotalPrice(newTotalPrice);
    };

    const handleDeleteSelected = () => {
        const itemsToDelete = cartItems.filter(item => item.selected).map(item => item.id);
        axios.delete('/delete-items', { data: { ids: itemsToDelete } })
            .then(response => {
                fetchCartItems(); // Fetch updated cart items after deletion
            })
            .catch(error => {
                console.error('Error deleting items:', error);
            });
    };

    const handleCheckout = () => {
        const selectedItems = cartItems.filter(item => item.selected);
        const selectedItemsParam = JSON.stringify(selectedItems);
    
        axios.post('/checkout', {
            items: selectedItems.map(item => item.id),
            totalPrice
        })
        .then(response => {
            console.log('Checkout successful:', response.data);
            window.location.href = route('transaction', {
                selectedItems: selectedItemsParam,
                totalPrice: totalPrice
            });
        })
        .catch(error => {
            console.error('Error during checkout:', error);
        });
    };

    return (
        <>
            <Head title="Cart" />
            <div className="container mx-auto px-4 pt-24 py-8">
                <div className="flex flex-col items-center mb-4">
                    <h1 className="text-4xl font-bold text-center mb-3">Shopping Cart</h1>
                </div>
                {cartItems.length > 0 ? (
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Select</th>
                                <th className="py-2">Product</th>
                                <th className="py-2">Price</th>
                                <th className="py-2">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td className="py-2 text-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-green-600"
                                            checked={item.selected || false}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                    </td>
                                    <td className="py-2 flex items-center">
                                        <img
                                            src={`http://localhost:8000/storage/${item.product.image}`}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-contain rounded-lg"
                                        />
                                        <div className="">
                                            <h3 className="text-lg text-center font-bold">{item.product.name}</h3>
                                        </div>
                                    </td>
                                    <td className="py-2 text-center">${item.product.price}</td>
                                    <td className="py-2 text-center">{item.product.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Your cart is empty.</p>
                )}
                <div className="flex justify-between items-center mt-4">
                    <Link
                        href={route('dashboard')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Back
                    </Link>
                    <button
                        onClick={handleDeleteSelected}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete Selected
                    </button>
                    <div>
                        <span className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</span>
                        <button
                            onClick={handleCheckout}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
                        >
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCart;
