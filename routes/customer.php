<?php

use App\Http\Controllers\CustomerDashboardController;
use App\Http\Controllers\CustomerOrderController;
use App\Http\Controllers\CustomerProfileController;
use App\Http\Middleware\CustomerAuthMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware([CustomerAuthMiddleware::class])->group(function () {
  Route::prefix('dashboard')->group(function () {
    Route::get('/', [CustomerDashboardController::class, 'show'])->name('dashboard');

    // order
    Route::get('order', [CustomerOrderController::class, 'show'])->name('dashboard.order');
    Route::get('order/detail/{id_order}', [CustomerOrderController::class, 'showDetail'])->name('dashboard.order.detail');
    Route::get('order/create', [CustomerOrderController::class, 'showCreate'])->name('dashboard.order.create');
    Route::post('order/create', [CustomerOrderController::class, 'create'])->name('dashboard.order.create');
    Route::get('order/create/{id_franchise}/menu', [CustomerOrderController::class, 'getCreateFranchiseMenu'])->name('dashboard.order.create.franchise.menu');

    // profile
    Route::get('profile', [CustomerProfileController::class, 'show'])->name('dashboard.profile');
    Route::put('profile', [CustomerProfileController::class, 'update'])->name('dashboard.profile');
  });
});
