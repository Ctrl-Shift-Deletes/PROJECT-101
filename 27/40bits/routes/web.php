<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Admin;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use  App\Http\Controllers\SalesController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Home - 1st page
Route::get('/home', function () {
    return Inertia::render('Home');
})->name('home');

// Sales 
Route::get('/sales', function () {
    return Inertia::render('Sales');
})->name('sales');

//Add Cart
Route::get('/addcart', function () {
    return Inertia::render('AddCart');
})->name('addcart');

//Add Product
Route::get('/addproduct', function () {
    return Inertia::render('AddProduct');
})->name('addproduct');

//Edit Product
Route::get('/editproducts', function () {
    return Inertia::render('EditProducts');
})->name('editproducts');

//Stocks
Route::get('/stocks', function () {
    return Inertia::render('Stocks');
})->name('stocks');

//Transaction
Route::get('/transaction', function () {
    return Inertia::render('Transaction');
})->name('transaction');

//User List
Route::get('/userlist', function () {
    return Inertia::render('UserList');
})->name('userlist');

//Dashbaord
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/posts', function () {
    return Inertia::render('Posts/PostComponent');
});


Route::post('/add-to-cart', [CartController::class, 'addToCart']);
Route::get('/cart-items', [CartController::class, 'getCartItems']);
Route::get('/total-sales', [CartController::class, 'getTotalSales']);

Route::post('/add-to-cart', [CartController::class, 'addToCart']);
Route::get('/cart-items', [CartController::class, 'getCartItems']);
Route::get('/total-sales', [CartController::class, 'getTotalSales']);
Route::get('/products/all', [ProductController::class, 'getAllProducts']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/save-transaction', [CartController::class, 'saveTransaction'])->name('save.transaction');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// 
Route::post('/save-sales', [SalesController::class, 'saveSalesData']);
Route::post('/add-to-cart', [CartController::class, 'addToCart']);
Route::get('/get-total-sales', [CartController::class, 'getTotalSales']);
Route::delete('/delete-items', [CartController::class, 'deleteItems']);
Route::get('/users', [UserController::class, 'index']);
Route::post('/checkout', [CartController::class, 'checkout'])->middleware('auth');
Route::post('/save-transaction', [CartController::class, 'saveTransaction'])->middleware('auth');
Route::delete('/products/{id}', [ProductController::class, 'destroy']);
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::post('/products/{id}', [ProductController::class, 'update']); 
Route::post('/add-to-cart', [CartController::class, 'store'])->middleware('auth');


Route::get('/transaction', function (Request $request) {
    $selectedItems = json_decode($request->input('selectedItems'), true);
    $totalPrice = $request->input('totalPrice');

    return Inertia::render('Transaction', [
        'selectedItems' => $selectedItems,
        'totalPrice' => $totalPrice
    ]);
})->name('transaction')->middleware('auth');

// Admin route
Route::get('/admin/dashboard', function () {
    return Inertia::render('AdminDashboard');
})->name('admin.dashboard')->middleware(Admin::class);


require __DIR__.'/auth.php';
