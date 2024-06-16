<?php

use App\Http\Controllers\CustomerDashboardController;
use App\Http\Controllers\CustomerOrderController;
use App\Http\Controllers\CustomerProfileController;
use App\Http\Middleware\CustomerAuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware([CustomerAuthMiddleware::class])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [CustomerDashboardController::class, 'show'])->name('dashboard');

        // order
        Route::get('order', [CustomerOrderController::class, 'show'])->name('dashboard.order');
        Route::get('order/detail/{id_order}', [CustomerOrderController::class, 'showDetail'])->name('dashboard.order.detail');
        Route::get('order/create/choose-restaurant', [CustomerOrderController::class, 'showChooseRestaurant'])->name('dashboard.order.create.chooseRestaurant');
        Route::get('order/create/{franchiseId}/choose-menu', [CustomerOrderController::class, 'showChooseMenu'])->name('dashboard.order.create.chooseMenu');
        Route::post('order/create', [CustomerOrderController::class, 'create'])->name('dashboard.order.create');

        // profile
        Route::get('profile', [CustomerProfileController::class, 'show'])->name('dashboard.profile');
        Route::put('profile', [CustomerProfileController::class, 'update']);
    });
});
