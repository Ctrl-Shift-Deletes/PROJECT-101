import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

function DeleteProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', price: '', image: null, stock: '' });
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products.');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);

    }
  };

  const handleDelete = (id) => {
    Inertia.delete(`/products/${id}`, {
      onSuccess: () => {
        setProducts(products.filter(product => product.id !== id));
        alert('Product successfully deleted.');
      },
      onError: (error) => {
        console.error('Error deleting product:', error);

      }
    });
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '' || isEditing) {
      return products; 
    }

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredProducts;
  };

  const handleEdit = (product) => {
    setIsEditing(true); 
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      image: null, 
      stock: product.stock,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    if (form.image) {
        formData.append('image', form.image);
    }

    try {
        await Inertia.post(`/products/${editingProduct.id}`, formData, {
            onSuccess: () => {
                fetchProducts();
                setEditingProduct(null);
                setIsEditing(false);
                
            },
            onError: (error) => {
                console.error('Error updating product:', error);
            }
        });

        alert('Successfully Updated');
    } catch (error) {
        console.error('Error posting product update:', error);
    }
};





  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm(prevForm => ({
        ...prevForm,
        [name]: files ? files[0] : null, // Handle file input
      }));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };
  

  return (
    <div className="text-center text-xl pt-4"style={{background: '#111827' }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 flex justify-end pr-24">
          <input
            type="text"
            placeholder="Search..."
            value={isEditing ? '' : searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 border rounded-full py-2 px-4 focus:outline-none"
            style={{ backgroundColor: 'white' }}
          />
        </div>
      </div>
      <div className="text-center text-xl">
        <h1 className="text-3xl pt-5 text-white font-bold mb-4">List products</h1>
        {editingProduct ? (
          <form onSubmit={handleUpdate} className="mb-6 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <div className="mb-4">
              <label className="block text-left mb-2 font-semibold" htmlFor="name">Product Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-left mb-2 font-semibold" htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="RPG">RPG</option>
                <option value="Strategy">Strategy</option>
                <option value="Simulation">Simulation</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-left mb-2 font-semibold" htmlFor="price">Price:</label>
              <input
                type="number"
                step="0.01"
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Price"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-left mb-2 font-semibold" htmlFor="stock">Stock:</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Stock"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-left mb-2 font-semibold" htmlFor="image">Product Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-between">
              <button type="submit" className="w-1/2 py-2 px-4 bg-blue-400 hover:bg-blue-500 text-white rounded-lg font-semibold mr-2">
                Update Product
              </button>
              <button
                onClick={() => { setEditingProduct(null); setIsEditing(false); }}
                className="w-1/2 py-2 px-4 bg-red-400 hover:bg-red-500 text-white rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-10 mt-6">
              {handleSearch().map(product => ( 
                <div key={product.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md flex flex-col">
                  <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />

                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm">{product.category}</p>
                  <p className="text-sm font-bold">₱{product.price}</p>
                  <div className="flex mt-1">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg mr-10"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Link href={route('admin.dashboard')} passHref>
              <a className="inline-block mt-6 bg-green-400 hover:bg-green-500 px-4 py-2 rounded-lg">
                <span className="relative z-10">Back</span>
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default DeleteProducts;
