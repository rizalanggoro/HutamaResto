<?php

use App\Http\Controllers\SuperAdminDashboardController;
use App\Http\Controllers\SuperAdminFranchiseController;
use App\Http\Middleware\SuperAdminAuthMiddleware;

Route::middleware(SuperAdminAuthMiddleware::class)->prefix('superadmin')->group(function () {
  Route::prefix('dashboard')->group(function () {
    Route::get('/', [SuperAdminDashboardController::class, 'show'])->name('superadmin.dashboard');

    // franchise
    Route::prefix('franchise')->group(function () {
      Route::get('/', [SuperAdminFranchiseController::class, 'show'])
        ->name('superadmin.dashboard.franchise');

      Route::get('create', [SuperAdminFranchiseController::class, 'showCreate'])
        ->name('superadmin.dashboard.franchise.create');
      Route::post('create', [SuperAdminFranchiseController::class, 'create']);

      Route::delete('delete/{id}', [SuperAdminFranchiseController::class, 'delete'])
        ->name('superadmin.dashboard.franchise.delete');
    });
  });
});
