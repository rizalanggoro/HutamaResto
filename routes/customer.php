<?php

use App\Http\Controllers\CustomerDashboardController;
use App\Http\Controllers\CustomerOrderController;
use App\Http\Middleware\CustomerAuthMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware([CustomerAuthMiddleware::class])->group(function () {
  Route::prefix('dashboard')->group(function () {
    Route::get('/', [CustomerDashboardController::class, 'show'])->name('dashboard');
    Route::get('order', [CustomerOrderController::class, 'show'])->name('order');
    Route::get('order/create', [CustomerOrderController::class, 'showCreate'])->name('order.create');
  });
});
