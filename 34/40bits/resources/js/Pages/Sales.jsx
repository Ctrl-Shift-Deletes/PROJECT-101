import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

export default function Sales() {
    const [totalSales, setTotalSales] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesResponse = await axios.get('/get-total-sales');
                setTotalSales(salesResponse.data.totalSales);

                const userResponse = await axios.get('/get-user-count');
                setUserCount(userResponse.data.userCount);

                const productResponse = await axios.get('/get-product-count');
                setProductCount(productResponse.data.productCount);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to save sales data (if needed)
    const handleSaveSalesData = async () => {
        try {
            const response = await axios.post('/save-sales', {
                amount: totalSales // Assuming you want to save totalSales as the amount
            });
            console.log('Sales data saved successfully:', response.data.message);
            // Optionally, update the UI or perform other actions upon successful save
        } catch (error) {
            console.error('Failed to save sales data:', error);
            // Handle error state or display a notification to the user
        }
    };

    return (
        <div>
            <div className="mb-4 flex pl-4 pt-4 justify-start">
                <Link
                    href={route('admin.dashboard')} // Replace with your route name
                    className="bg-yellow-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                    Dashboard
                </Link>
            </div>
            <div className="flex flex-wrap space-x-3 mt-3 pt-10 justify-center">
                <SalesCard value={totalSales} label="Sales" color="green" />
                <SalesCard value={userCount} label="Customers" color="blue" />
                <SalesCard value={productCount} label="Products" color="red" />
            </div>
        </div>
    );
}

// Functional component to represent each card in the sales dashboard
function SalesCard({ value, label, color }) {
    return (
        <div className={`bg-${color}-500 text-white p-6 rounded-lg shadow-md m-3 w-64 h-32 flex flex-col justify-center items-center`}>
            <h2 className="text-2xl font-bold">{label === "Sales" ? `$${value.toLocaleString()}` : value.toLocaleString()}</h2>
            <p className="text-lg">{label}</p>
        </div>
    );
}
