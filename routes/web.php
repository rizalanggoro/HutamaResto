<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerAuthController;
use App\Http\Controllers\CustomerLoginController;
use App\Http\Controllers\CustomerRegisterController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AdminAuthMiddleware;
use App\Http\Middleware\CustomerAuthMiddleware;
use App\Http\Middleware\SuperAdminAuthMiddleware;
use App\Models\Role;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// all roles
Route::get('/', [LandingPageController::class, 'show'])->name('home');

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

// customer
require __DIR__ . '/customer.php';

// admin
require __DIR__ . '/admin.php';

// super admin
Route::middleware(SuperAdminAuthMiddleware::class)->prefix('superadmin')->group(function () {
  Route::get('dashboard', fn () => Inertia::render('SuperAdmin/Dashboard'))->name('superadmin.dashboard');
});

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
