<?php

use App\Http\Controllers\SuperAdminDashboardController;
use App\Http\Controllers\SuperAdminFranchiseController;
use App\Http\Middleware\SuperAdminAuthMiddleware;

Route::middleware(SuperAdminAuthMiddleware::class)->prefix('superadmin')->group(function () {
  Route::prefix('dashboard')->group(function () {
    Route::get('/', [SuperAdminDashboardController::class, 'show'])->name('superadmin.dashboard');

    // Franchise
    Route::get('franchise', [SuperAdminFranchiseController::class, 'show'])->name('superadmin.dashboard.franchise');
    Route::get('franchise/create', [SuperAdminFranchiseController::class, 'showCreate'])->name('superadmin.dashboard.franchise.create');
  });
});
