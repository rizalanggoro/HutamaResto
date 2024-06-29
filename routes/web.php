<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

// all roles
Route::get('/', [PublicController::class, 'show'])->name('home');
Route::get('franchise', [PublicController::class, 'showFranchise'])->name('home.franchise');
Route::get('franchise/{id}', [PublicController::class, 'showFranchiseDetail'])
  ->name('home.franchise.detail');
Route::get('menu', [PublicController::class, 'showMenu'])->name('home.menu');

// authentication
Route::get('login', [AuthController::class, 'showCustomerLogin'])->name('login');
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::prefix('admin')->group(function () {
  Route::get('login', [AuthController::class, 'showAdminLogin'])->name('admin.login');
  Route::post('login', [AuthController::class, 'login'])->name('admin.login');
});
Route::prefix('superadmin')->group(function () {
  Route::get('login', [AuthController::class, 'showSuperAdminLogin'])->name('superadmin.login');
  Route::post('login', [AuthController::class, 'login'])->name('superadmin.login');
});
Route::get('register', [AuthController::class, 'showCustomerRegister'])->name('register');
Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('logout', [AuthController::class, 'logout'])->name('logout');

require __DIR__ . '/customer.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/superadmin.php';

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__ . '/auth.php';
