import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react'; // Import Link from inertiajs/react

function Stocks() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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


    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-start">
                <Link
                    href={route('admin.dashboard')}
                    className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                    Dashboard
                </Link>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-center pt-10 pd-12">Remaining Stocks</h1>
            <table className="min-w-full border-collapse border border-black">
                <thead>
                    <tr>
                        <th className='px-4 py-8' colSpan="4">
                            <input
                                type="text"
                                placeholder="Search by product name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-1 w-64"
                            />
                        </th>
                    </tr>
                    <tr>
                        <th style={{ width: '20%' }} className="border border-black px-4 py-2 bg-gray-200">Name</th>
                        <th style={{ width: '15%' }} className="border border-black px-1 py-2 bg-gray-200">Category</th>
                        <th style={{ width: '15%' }} className="border border-black px-1 py-2 bg-gray-200">Price</th>
                        <th style={{ width: '15%' }} className="border border-black px-1 py-2 bg-gray-200">Stocks</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id} className={getRowClass(product.stock)}>
                            <td style={{ width: '20%' }} className="border border-black text-center px-4 py-2">{product.name}</td>
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
