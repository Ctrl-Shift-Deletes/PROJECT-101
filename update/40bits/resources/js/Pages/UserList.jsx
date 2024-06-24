import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user.usertype.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const getUserRowColor = (usertype) => {
        if (usertype.toLowerCase() === 'admin') {
            return 'bg-orange-200'; // Orange background for admin
        } else {
            return 'bg-green-200'; // Green background for user (assuming other types are users)
        }
    };

    return (
        <div className="container mx-auto p-4" style={{ background: '#111827', minHeight: '100vh', minWidth: '100vw', color: '#fff' }}>
            <Link href={route('admin.dashboard')} passHref>
                <a className="absolute top-2 pl-2 pt-2 left-3 px-4 py-2 bg-green-400 hover:bg-green-500 rounded-lg">
                    <span className="absolute inset-0"></span>
                    <span className="relative z-10">Back</span>
                </a>
            </Link>
            <h1 className="text-4xl font-bold text-center pt-7 mb-4">User List</h1>
            <p className='text-lg font-bold text-center'>This is the registered accounts</p>
            <div className="mb-4 flex pt-4 justify-center">
                <input
                    type="text"
                    placeholder="Search by name, email, or user type"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p border-gray-300 rounded-md px-3 py-1 w-80"
                />
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-black">Name</th>
                        <th className="py-2 px-4 border-b text-black">Email</th>
                        <th className="py-2 px-4 border-b text-black">User Type</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id} className={getUserRowColor(user.usertype)}>
                            <td className="py-2 px-4 text-center border-b text-black">{user.name}</td>
                            <td className="py-2 px-4 text-center border-b text-black">{user.email}</td>
                            <td className="py-2 px-4 text-center border-b text-black">{user.usertype}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
