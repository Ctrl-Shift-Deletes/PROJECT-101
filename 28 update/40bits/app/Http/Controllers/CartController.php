<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AddCart;
use App\Models\Product;
use App\Models\Sales;
use App\Models\Transaction;
class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $product_id = $request->input('product_id');
        $product = Product::find($product_id);

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        if ($product->stock <= 0) {
            return response()->json(['error' => 'Out of stock'], 400);
        }

        // Decrease stock by 1
        $product->stock -= 1;
        $product->save();

        // Save to cart
        $cartItem = new AddCart();
        $cartItem->user_id = auth()->id();
        $cartItem->product_id = $product_id;
        $cartItem->save();

        // Calculate total sales after adding to cart
        $totalSales = Product::sum('price');

        // Save sales data to 'sales' table
        $sales = new Sales();
        $sales->user_id = auth()->id();
        $sales->amount = $totalSales;
        $sales->save();

        return response()->json(['message' => 'Product added to cart successfully', 'totalSales' => $totalSales], 200);
    }



    public function getCartItems()
    {
        $user_id = auth()->id();

        $cartItems = AddCart::where('user_id', $user_id)->with('product')->get();

        return response()->json($cartItems, 200);
    }

    public function getTotalSales()
    {
        $totalSales = Sales::sum('amount'); // Assuming 'amount' is the field storing sales amounts

        return response()->json(['totalSales' => $totalSales], 200);
    }

    public function deleteItems(Request $request)
    {
        $ids = $request->input('ids');
        AddCart::whereIn('id', $ids)->delete();

        // Optionally, you might want to update the stock of products if necessary
        // Example: Product::whereIn('id', $productIds)->increment('stock');

        return response()->json(['message' => 'Items deleted successfully'], 200);
    }

    public function checkout(Request $request)
    {
        $itemIds = $request->input('items');
        
        // Fetch selected items from cart with product details
        $selectedItems = AddCart::whereIn('id', $itemIds)->with('product')->get();

        // Calculate total price of selected items
        $totalPrice = $selectedItems->sum(function ($item) {
            return $item->product->price;
        });

        // Delete selected items from cart
        AddCart::whereIn('id', $itemIds)->delete();

        // Save the transaction
        $transaction = new Transaction();
        $transaction->user_id = auth()->id();
        $transaction->total_price = $totalPrice;
        $transaction->payment_method = 'Some Payment Method'; // Adjust based on actual payment method logic
        $transaction->save();

        return response()->json([
            'message' => 'Checkout successful',
            'selectedItems' => $selectedItems,
            'totalPrice' => $totalPrice
        ]);
    }


    public function saveTransaction(Request $request)
    {
        $selectedItems = $request->input('selectedItems');
        $totalPrice = $request->input('totalPrice');
        $paymentMethod = $request->input('paymentMethod');

        // Save the transaction
        $transaction = new Transaction();
        $transaction->user_id = auth()->id();
        $transaction->total_price = $totalPrice;
        $transaction->payment_method = $paymentMethod;
        $transaction->save();

        // Optionally, you can save the items associated with the transaction
        // if you have a separate table for that or if you want to save it in the transaction record

        return response()->json(['message' => 'Transaction saved successfully'], 200);
    }



}
