import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard({ auth }) {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [buyMessage, setBuyMessage] = useState({});   
    const [totalSales, setTotalSales] = useState(0); // State for total sales
    

    useEffect(() => {
        fetchProducts();
        fetchTotalSales();

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

    const fetchProducts = () => {
        axios.get('/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

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

    const fetchTotalSales = () => {
        axios.get('/total-sales')
            .then(response => {
                setTotalSales(response.data.totalSales);
            })
            .catch(error => {
                console.error('Error fetching total sales:', error);
            });
    };

    const handleBuy = (productId) => {
        axios.post('/add-to-cart', { product_id: productId })
            .then(response => {
                setBuyMessage(prevState => ({ ...prevState, [productId]: 'Added to Cart' }));
                fetchProducts(); // Optionally update products list after adding to cart
                setTotalSales(response.data.totalSales); // Update total sales after adding to cart
    
                setTimeout(() => {
                    setBuyMessage(prevState => ({ ...prevState, [productId]: '' }));
                }, 1000);
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
            });
    };
    
    
    

    return (
        <>
            <Head title="User Dashboard" />

            <div className="flex pl-9 pb-5 pt-3" style={{ height: '800px' , background: '#111827' }}>
                <aside className="bg-gray-700 w-24 flex flex-col items-center py-5 rounded-full">
                    <img src="/assets/logo.JPG" alt="Logo" className="w-35 h-35 mb-1 pt-10" />
                    <nav className="flex flex-col gap-5 mt-12">

                        <Link href="/dashboard" className="text-yellow-500 py-5">
                            <div className="group flex flex-col items-center text-center">
                                <svg 
                                    className="w-12 h-8" 
                                    fill="currentColor" 
                                    viewBox="0 0 576 512"
                                >
                                   <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                                </svg>
                                <h1 className="ml-1 mt-1 text-transparent font-bold group-hover:text-green-400">Dashboard</h1>
                            </div>
                        </Link>



                        <Link href="/addcart" className="text-yellow-500 py-5  ">
                        <div className="group flex flex-col items-center text-center">
                                <svg
                                    className="w-12 h-8 "
                                    fill="currentColor"
                                    viewBox="0 0 600 512"
                                >
                                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                                </svg>
                                <h1 className="ml-1 mt-1 text-transparent font-bold group-hover:text-green-400">Cart</h1>
                            </div>
                        </Link>


                        <Link href="/receipt" className="text-yellow-500 py-5  ">
                        <div className="group flex flex-col items-center text-center">
                                <svg
                                    className="w-12 h-8 "
                                    fill="currentColor"
                                    viewBox="0 0 412 512"
                                >
                                    <path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-
                                    16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z"/>
                                </svg>
                                <h1 className="ml-1 mt-1 text-transparent font-bold group-hover:text-green-400">Receipt</h1>
                            </div>
                        </Link>

                        <Link href="/profile" className="text-yellow-500 py-5  ">
                        <div className="group flex flex-col items-center text-center">
                                <svg
                                    className="w-12 h-8 "
                                    fill="currentColor"
                                    viewBox="0 0 412 512"
                                >
                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                                </svg>
                                <h1 className="ml-1 mt-1 text-transparent font-bold group-hover:text-green-400">Profile</h1>
                            </div>
                        </Link>

                        
                             
                        <Link href={route('logout')} method="post" as="button">
                        <div className="text-l text-yellow-500 font-bold py-3 group" >
                                <svg
                                    className="w-20 h-8 "
                                    fill="currentColor"
                                    viewBox="0 0 412 512"
                                >
                                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                                </svg>
                                <span className="ml-1 mt-1 text-transparent font-bold group-hover:text-green-400">Log Out</span>
                            </div>
                        </Link>

                    </nav>
                </aside>

                <div className="flex-1 flex flex-col relative">
                    <div className="flex justify-between items-center ">
                     <div className="flex-1 flex justify-end pr-24">
                            <input 
                                type="text" 
                                placeholder="Search..."  
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-64 border rounded-full py-2 px-4 focus:outline-none" 
                                style={{ backgroundColor: 'white' }}
                            />
                        </div>
                    </div>
                    <main className="p-4">
                        <div className="">
                            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                                <div className="sm:rounded-xl">
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
                                                <img src="/assets/header-home-fourth.png" alt="Slide 3" className="w-full rounded-xl border border-gray-300" />
                                            </div>
                                        </div>
                                        <div className="bg-gray-900 p-4 justify-between rounded-lg text-center ">
                                        {/* Category Section */}
                                                <div className="flex justify-center items-center h-full">
                                                <div className="flex items-center justify-center mb-4">
                                                    <label htmlFor="category" className="text-red-100 pl-5 mr-2"></label>
                                                    <div className="relative">
                                                        <select
                                                            id="category"
                                                            className="border rounded-md py-3 px-6 pl-9 pr-8 focus:outline-none appearance-none bg-gray-500 text-gray-100"
                                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="action">Action</option>
                                                            <option value="adventure">Adventure</option>
                                                            <option value="rpg">RPG</option>
                                                            <option value="strategy">Strategy</option>
                                                            <option value="simulation">Simulation</option>
                                                        </select>
                                                        <div className="absolute inset-y-0 right-2 flex items-center pl-2 pointer-events-none">
                                                            <svg className="w-7 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap mx-2 bg-gray-900 pl-5 gap-2 mt-2" style={{ width: '1100px', height: '300px', overflowY: 'auto'}}>
                                                {handleSearch().map((product, index) => ( 
                                                    <div key={product.id} className=" text-center bg-gray-900 rounded-2xl shadow-md  p-4 rounded-lg" style={{ width: '200px', height: '340px' }}>
                                                        <div className="bg-gray-500 p-3 rounded-lg shadow-md">
                                                            <img 
                                                                src={`/storage/${product.image}`} 
                                                                alt={product.name} 
                                                                className="w-full h-32 object-contain mb-2" />   

                                                            <h3 className="text-sm font-semi-bold text-center" style={{ color: "white" }}>{product.name}</h3>
                                                            <p className="text-gray-600 text-center"style={{ color: "white" }}>{product.category}</p>
                                                            <p className="text-green-600 font-bold text-center mb-1">₱{product.price}</p>
                                                            <div className="flex justify-center mb-4">
                                                                <button 
                                                                    onClick={() => handleBuy(product.id)}
                                                                    className={` px-4 py-2 rounded-lg ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                                                    disabled={product.stock === 0}
                                                                >
                                                                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                                                </button>
                                                                {buyMessage[product.id] && (
                                                                    <p className={` ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                                        {buyMessage[product.id]}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {Object.values(buyMessage).some(msg => msg) && (
                                                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded">
                                                    {Object.values(buyMessage).find(msg => msg)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
