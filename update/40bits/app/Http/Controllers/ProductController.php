<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:Action,Adventure,RPG,Strategy,Simulation',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'stock' => 'required|integer|min:0', 
        ]);


        $imagePath = $request->file('image')->store('product_images', 'public');

        $product = Product::where('name', $validatedData['name'])
                        ->where('category', $validatedData['category'])
                        ->first();

        if ($product) {
            // Update the stock of the existing product
            $product->stock += $validatedData['stock'];
            $product->save();
        } else {
            // Create new product
            Product::create([
                'name' => $validatedData['name'],
                'category' => $validatedData['category'],
                'price' => $validatedData['price'],
                'image' => $imagePath,
                'stock' => $validatedData['stock'],
            ]);
        }

        return redirect()->back()->with('success', 'Product added successfully!');
    }


    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Delete the image file
        Storage::disk('public')->delete($product->image);

        $product->delete();

    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:Action,Adventure,RPG,Strategy,Simulation',
            'price' => 'required|numeric',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
    
            Storage::disk('public')->delete($product->image);

            $imagePath = $request->file('image')->store('product_images', 'public');
            $product->image = $imagePath;
        }

        $product->update([
            'name' => $validatedData['name'],
            'category' => $validatedData['category'],
            'price' => $validatedData['price'],
            'image' => $product->image,
            'stock' => $request->input('stock'),
        ]);

    }

    public function getProductCount()
    {
        $productCount = Product::count();
        return response()->json(['productCount' => $productCount]);
    }
}
