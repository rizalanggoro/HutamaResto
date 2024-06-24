<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminMenuController;
use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\AdminPaymentController;
use App\Http\Controllers\AdminProfileController;
use App\Http\Middleware\AdminAuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(AdminAuthMiddleware::class)->prefix('admin')->group(function () {
  Route::prefix('dashboard')->group(function () {
    // dashboard
    Route::get('/', [AdminDashboardController::class, 'show'])->name('admin.dashboard');

    // order
    Route::get('order', [AdminOrderController::class, 'show'])->name('admin.dashboard.order');
    Route::get('order/payment-verification', [AdminOrderController::class, 'showPaymentVerification'])->name('admin.dashboard.order.paymentVerification');
    Route::patch('order/{orderId}/payment-verification', [AdminOrderController::class, 'verifyPayment'])->name('admin.dashboard.order.verifyPayment');
    Route::get('order/{orderId}', [AdminOrderController::class, 'showDetail'])->name('admin.dashboard.order.detail');
    Route::patch('order/{orderId}/mark-as-done', [AdminOrderController::class, 'markOrderAsDone'])->name('admin.dashboard.order.markAsDone');
    Route::patch('order/order-item/{orderItemId}', [AdminOrderController::class, 'updateIsDoneOrderItem'])->name('admin.dashboard.order.orderItem.updateIsDone');

    // menu
    Route::get('menu', [AdminMenuController::class, 'show'])->name('admin.dashboard.menu');
    Route::delete('menu/{id}', [AdminMenuController::class, 'delete'])->name('admin.dashboard.menu.delete');
    Route::patch('menu/{id}/availability', [AdminMenuController::class, 'updateAvailability'])->name('admin.dashboard.menu.updateAvailability');
    Route::get('menu/create', [AdminMenuController::class, 'showCreate'])->name('admin.dashboard.menu.create');
    Route::post('menu/create', [AdminMenuController::class, 'create'])->name('admin.dashboard.menu.create');

    // promo
    Route::get('promo', fn () => 'hello world')->name('admin.dashboard.promo');

    // profile
    Route::get('profile', [AdminProfileController::class, 'show'])->name('admin.dashboard.profile');
    Route::put('profile', [AdminProfileController::class, 'update']);
  });
});
