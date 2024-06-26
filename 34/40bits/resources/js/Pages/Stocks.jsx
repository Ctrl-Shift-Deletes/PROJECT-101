import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react'; // Import Link from inertiajs/react

function Stocks() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const getRowClass = (stock) => {
        if (stock === 0) return 'bg-red-500';
        if (stock >= 1 && stock <= 29) return 'bg-yellow-500';
        if (stock >= 30) return 'bg-green-500';
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-start">
                <Link
                    href={route('admin.dashboard')} // Replace with your route name
                    className="bg-yellow-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                    Dashboard
                </Link>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-center pt-10 pd-12">Remaining Stocks</h1>
            <table className="min-w-full border-collapse border border-black">
                <thead>
                    <tr>
                        <th style={{ width: '25%' }} className="border border-black px-4 py-2 bg-gray-200">Name</th>
                        <th style={{ width: '15%' }} className="border border-black px-1 py-2 bg-gray-200">Category</th>
                        <th style={{ width: '15%' }} className="border border-black px-1 py-2 bg-gray-200">Price</th>
                        <th style={{ width: '15%' }} className="border border-black px-1 py-2 bg-gray-200">Stocks</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className={getRowClass(product.stock)}>
                            <td style={{ width: '25%' }} className="border border-black text-center px-4 py-2">{product.name}</td>
                            <td style={{ width: '15%' }} className="border border-black text-center px-4 py-2">{product.category}</td>
                            <td style={{ width: '15%' }} className="border border-black text-center px-1 py-2">₱{product.price}</td>
                            <td style={{ width: '15%' }} className="border border-black text-center px-1 py-2">{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Stocks;
