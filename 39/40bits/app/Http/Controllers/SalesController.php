<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sales;  // Assuming Sale model exists

class SalesController extends Controller
{
    public function saveSalesData(Request $request)
    {
        try {
            // Example: Create a new Sale record
            $sale = new Sales();
            $sale->amount = $request->input('amount');
            $sale->product_id = $request->input('product_id');
            // Add more fields as necessary
            $sale->save();

            return response()->json(['message' => 'Sales data saved successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to save sales data'], 500);
        }
    }

    public function getTotalSales()
    {
        $totalSalesByProduct = Sales::select('product_id', \DB::raw('SUM(amount) as totalSales'))
                                    ->groupBy('product_id')
                                    ->get();

        return response()->json(['totalSalesByProduct' => $totalSalesByProduct], 200);
    }


}
