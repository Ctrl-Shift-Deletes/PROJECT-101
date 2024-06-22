<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'category', 'price', 'image', 'stock'];

    public function carts()
    {
        return $this->hasMany(AddCart::class);
    }

    public function getAllProducts()
    {
        $products = Product::all(); // Adjust query as per your requirement
        return response()->json($products, 200);
    }
}
