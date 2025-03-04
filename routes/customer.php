<?php

use App\Http\Controllers\CustomerComplaintController;
use App\Http\Controllers\CustomerDashboardController;
use App\Http\Controllers\CustomerOrderController;
use App\Http\Controllers\CustomerPaymentController;
use App\Http\Controllers\CustomerProfileController;
use App\Http\Controllers\CustomerReviewController;
use App\Http\Middleware\CustomerAuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware([CustomerAuthMiddleware::class])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [CustomerDashboardController::class, 'show'])->name('dashboard');

        // order
        Route::get('order', [CustomerOrderController::class, 'show'])
            ->name('dashboard.order');
        Route::post('order', [CustomerOrderController::class, 'create']);

        Route::get('order/detail/{id}', [CustomerOrderController::class, 'showDetail'])
            ->name('dashboard.order.detail');
        Route::get('order/choose-restaurant', [CustomerOrderController::class, 'showChooseRestaurant'])
            ->name('dashboard.order.create.chooseRestaurant');
        Route::get('order/restaurant/{franchiseId}/choose-menu', [CustomerOrderController::class, 'showChooseMenu'])
            ->name('dashboard.order.create.chooseMenu');
        Route::delete('order/{id}', [CustomerOrderController::class, 'delete'])
            ->name('dashboard.order.delete');

        // review
        Route::prefix('review')->group(function () {
            Route::get('/', [CustomerReviewController::class, 'show'])
                ->name('dashboard.review');
            Route::post('/', [CustomerReviewController::class, 'create']);
            Route::delete('delete/{id}', [CustomerReviewController::class, 'delete'])
                ->name('dashboard.review.delete');
        });

        // payment
        Route::post('payment/upload-receipt', [CustomerPaymentController::class, 'uploadReceipt'])->name('dashboard.payment.uploadReceipt');

        // profile
        Route::get('profile', [CustomerProfileController::class, 'show'])->name('dashboard.profile');
        Route::post('profile', [CustomerProfileController::class, 'update']);
    });
});
