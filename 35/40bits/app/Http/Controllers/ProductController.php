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
            'stock' => 'required|integer|min:0', // Validate stock
        ]);

        // Handle image upload
        $imagePath = $request->file('image')->store('product_images', 'public');

        // Check if product with the same name and category already exists
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

        return response()->json(['message' => 'Product deleted successfully!']);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:Action,Adventure,RPG,Strategy,Simulation',
            'price' => 'required|numeric',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image upload
        ]);

        // Handle image upload if a new image is provided
        if ($request->hasFile('image')) {
            // Delete the old image
            Storage::disk('public')->delete($product->image);

            $imagePath = $request->file('image')->store('product_images', 'public');
            $product->image = $imagePath;
        }

        $product->update([
            'name' => $validatedData['name'],
            'category' => $validatedData['category'],
            'price' => $validatedData['price'],
            'image' => $product->image,
        ]);

        return response()->json(['message' => 'Product updated successfully!']);
    }

    public function getProductCount()
    {
        $productCount = Product::count();
        return response()->json(['productCount' => $productCount]);
    }
}
