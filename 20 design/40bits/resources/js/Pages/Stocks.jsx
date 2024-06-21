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

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-start">
                <Link
                    href={route('dashboard')} // Replace with your route name
                    className="bg-yellow-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                    Dashboard
                </Link>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-center pt-10 pd-8">Remaining Stocks</h1>
            <table className="min-w-full border-collapse border border-black">
                <thead>
                    <tr>
                        <th className="border border-black px-4 py-2 bg-gray-200">Name</th>
                        <th className="border border-black px-4 py-2 bg-gray-200">Category</th>
                        <th className="border border-black px-4 py-2 bg-gray-200">Price</th>
                        <th className="border border-black px-4 py-2 bg-gray-200">Stocks</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td className="border border-black px-4 py-2">{product.name}</td>
                            <td className="border border-black px-4 py-2">{product.category}</td>
                            <td className="border border-black px-4 py-2">{product.price}</td>
                            <td className="border border-black px-4 py-2">{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Stocks;
