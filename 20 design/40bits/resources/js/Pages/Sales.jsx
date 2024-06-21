import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react'; // Import Link from inertiajs/react

export default function Sales() {
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        const fetchTotalSales = async () => {
            try {
                const response = await axios.get('/get-total-sales');
                setTotalSales(response.data.totalSales);
            } catch (error) {
                console.error('Error fetching initial total sales:', error);
            }
        };

        fetchTotalSales();
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
            <div className="mb-4 flex justify-start">
                <Link
                    href={route('dashboard')} // Replace with your route name
                    className="bg-yellow-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                    Dashboard
                </Link>
            </div>
            <div className="flex space-x-3 mt-3">
                <SalesCard value={totalSales} label="Sales" color="green" />
                <SalesCard value={0} label="Categories" color="blue" />
                <SalesCard value={0} label="Customers" color="purple" />
                <SalesCard value={0} label="Products" color="red" />
            </div>
        </div>
    );
}

// Functional component to represent each card in the sales dashboard
function SalesCard({ value, label, color }) {
    return (
        <div className={`bg-${color}-500 text-white p-3 rounded-lg shadow-md w-2/4`}>
            <h2 className="text-2xl font-bold">${value.toLocaleString()}</h2>
            <p className="text-lg">{label}</p>
        </div>
    );
}
