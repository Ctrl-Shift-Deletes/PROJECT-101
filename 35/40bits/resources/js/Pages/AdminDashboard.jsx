import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard({ auth }) {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [buttonColor, setButtonColor] = useState('green');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        axios.get('/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

        let slideIndex = 0;
        const slides = document.getElementsByClassName("slide");
        const showSlides = () => {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1; }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 2000); // Change image every 2 seconds
        };
        showSlides();
    }, []);

    const handleSearch = () => {
        let filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product =>
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        return filteredProducts;
    };

    const handleButtonClick = () => {
        setButtonColor('blue');
        setTimeout(() => {
            setButtonColor('green');
        }, 500);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin Dashboard" />

            <div className="flex pt-4 pl-4" style={{ height: '1000px', backgroundColor: '#475569' }}>

                <aside className="bg-gray-500 w-40 flex flex-col items-center py-5 rounded-full">
                    <img
                        src="/assets/logo.JPG"
                        alt="Logo"
                        className="w-35 h-35 mb-1 pt-5"
                    />
                    <nav
                        className="flex flex-col gap-10 mt-5"
                    >

                        <Link href="/addproduct" className="text-yellow-500 py-4  ">
                          <div className="group flex flex-col items-center text-center">
                                <svg
                                    className="w-10 h-10 group-hover:text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M248 0H208c-26.5 0-48 21.5-48 48V160c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V48c0-26.5-21.5-48-48-48H328V80c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V0zM64 256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H184v80c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V256H64zM352 512H512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H472v80c0 8.8-7.2 16-16 16H408c-8.8 0-16-7.2-16-16V256H352c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2V464c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z"/>
                                </svg>
                                <h1 className="ml-1 mt-1 group-hover:text-green-500">Add Products</h1>
                            </div>
                        </Link>


                        <Link href="/editproducts" className="text-yellow-500 py-4  ">
                          <div className="group flex flex-col items-center text-center">
                                <svg
                                    className="w-10 h-10 group-hover:text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                                </svg>
                                <h1 className="ml-1 mt-1 group-hover:text-green-500">Edit Products</h1>
                            </div>
                        </Link>

      
                        <Link href="/stocks" className="text-yellow-500 py-4  ">
                          <div className="group flex flex-col items-center text-center">
                                <svg
                                    className="w-10 h-10 group-hover:text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M470.7 9.4c3 3.1 5.3 6.6 6.9 10.3s2.4 7.8 2.4 12.2l0 .1v0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3L310.6 214.6c-11.8 11.8-30.8 12.6-43.5 1.7L176 138.1 84.8 216.3c-13.4 11.5-33.6 9.9-45.1-3.5s-9.9-33.6 3.5-45.1l112-96c12-10.3 29.7-10.3 41.7 0l89.5 76.7L370.7 64H352c-17.7 0-32-14.3-32-32s14.3-32 32-32h96 0c8.8 0 16.8 3.6 22.6 9.3l.1 .1zM0 304c0-26.5 21.5-48 48-48H464c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V304zM48 416v48H96c0-26.5-21.5-48-48-48zM96 304H48v48c26.5 0 48-21.5 48-48zM464 416c-26.5 0-48 21.5-48 48h48V416zM416 304c0 26.5 21.5 48 48 48V304H416zm-96 80a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/>
                                 </svg>
                                <h1 className="ml-1 mt-1 group-hover:text-green-500">Stocks</h1>
                            </div>
                        </Link>


                        <Link href="/userlist" className="text-yellow-500 py-4  ">
                          <div className="group flex flex-col items-center text-center">
                                <svg
                                    className="w-10 h-10 group-hover:text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-8 384V352h16V480c0 17.7 14.3 32 32 32s32-14.3 32-32V192h56 64 16c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64H576V256H384V224H320v48c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H368c-26.5 0-48 21.5-48 48v80H243.1 177.1c-33.7 0-64.9 17.7-82.3 46.6l-58.3 97c-9.1 15.1-4.2 34.8 10.9 43.9s34.8 4.2 43.9-10.9L120 256.9V480c0 17.7 14.3 32 32 32s32-14.3 32-32z"/>
                                </svg>
                                <h1 className="ml-1 mt-1 group-hover:text-green-500">User List</h1>
                            </div>
                        </Link>

                        <Link href="/sales" className="text-yellow-500 py-4  ">
                        <div className="group flex flex-col items-center text-center">
                                <svg
                                    className="w-10 h-10 group-hover:text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M539.7 237.3c3.1-12.3 4.3-24.8 4.3-37.4C544 107.4 468.6 32 376.1 32c-77.2 0-144.6 53-163 127.8-15.3-13.2-34.9-20.5-55.2-20.5-46.3 0-84 37.7-84 84 0 7.4 .9 15 3.1 22.4-42.9 20.2-70.8 63.7-70.8 111.2C6.2 424.8 61.7 480 129.4 480h381.2c67.7 0 123.2-55.2 123.2-123.2 0-56.4-38.9-106-94.1-119.5zM199.9 401.6c0 8.3-7 15.3-15.3 15.3H153.6c-8.3 0-15.3-7-15.3-15.3V290.6c0-8.3 7-15.3 15.3-15.3h30.9c8.3 0 15.3 7 15.3 15.3v110.9zm89.5 0c0 8.3-7 15.3-15.3 15.3h-30.9c-8.3 0-15.3-7-15.3-15.3V270.1c0-8.3 7-15.3 15.3-15.3h30.9c8.3 0 15.3 7 15.3 15.3v131.5zm89.5 0c0 8.3-7 15.3-15.3 15.3h-30.9c-8.3 0-15.3-7-15.3-15.3V238.8c0-8.3 7-15.3 15.3-15.3h30.9c8.3 0 15.3 7 15.3 15.3v162.7zm87 0c0 8.3-7 15.3-15.3 15.3h-28.5c-8.3 0-15.3-7-15.3-15.3V176.9c0-8.6 7-15.6 15.3-15.6h28.5c8.3 0 15.3 7 15.3 15.6v224.6z"/>
                                </svg>
                                <h1 className="ml-1 mt-1 group-hover:text-green-500">Sales</h1>
                            </div>
                        </Link>

                    </nav>
                </aside>

                <div className="flex-1 flex flex-col relative">
                    <div className="flex justify-between items-center bg-white dark:bg-black">
                        <div className="flex-1 flex justify-end pr-24 ">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-64 border rounded-full py-1 px-4 focus:outline-none"
                            />
                            <button
                                onClick={handleButtonClick}
                                className={`ml-2 px-4 py-2 bg-${buttonColor}-500 text-white rounded-lg`}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <main className="p-4">
                        <div className="">
                            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6 text-gray-900">
                                        <div className="relative w-full max-w-10xl mx-auto">
                                            <div className="slide" style={{ display: 'none' }}>
                                                <img src="/assets/header-home.png" alt="Slide 1" className="w-full rounded-xl border border-gray-300" />
                                            </div>
                                            <div className="slide" style={{ display: 'none' }}>
                                                <img src="/assets/header-home-second.png" alt="Slide 2" className="w-full rounded-xl border border-gray-300" />
                                            </div>
                                            <div className="slide" style={{ display: 'none' }}>
                                                <img src="/assets/header-home-third.png" alt="Slide 3" className="w-full rounded-xl border border-gray-300" />
                                            </div>
                                            <div className="slide" style={{ display: 'none' }}>
                                                <img src="/assets/header-home-fourth.png" alt="Slide 4" className="w-full rounded-xl border border-gray-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-200 p-4 rounded-lg shadow-md relative">
                                    {/* Categories Section */}
                                    <div className="flex items-center mb-4">
                                        <label htmlFor="category" className="text-gray-700 mr-2">Category:</label>
                                        <div className="relative">
                                            <select
                                                id="category"
                                                className="border  rounded-md py-2 px-5 pl-7 pr-5 focus:outline-none appearance-none"
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                            >
                                                <option value="">Category </option>
                                                <option value="action">Action</option>
                                                <option value="adventure">Adventure</option>
                                                <option value="rpg">RPG</option>
                                                <option value="strategy">Strategy</option>
                                                <option value="simulation">Simulation</option>
                                            </select>
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-2 gap-10 mt-6">
                                        {handleSearch().map((product, index) => ( 
                                            <div key={product.id} className=" text-center bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-md product-card border p-4 rounded-lg" style={{ width: '150px', height: '250px' }}>
                                                <img
                                                    src={`/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="w-full h-32 object-contain rounded-lg mb-2"
                                                />
                                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                                <p className="text-sm">{product.category}</p>
                                                <p className="text-lg text-green-500 ">₱ {product.price}</p>
                                            { /* <button onClick={() => handleBuy(product.id)} className="mt-1 px-3 py-1 bg-green-500 text-white rounded-lg">Buy</button> */}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

