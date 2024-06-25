<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminDashboardController extends Controller {
  public function show() {
    $user = Auth::user();
    $franchise = $user->franchise()->firstOrFail();
    $orderWaitingPaymentVerificationCount = $franchise->orders()
      ->whereStatus('waiting_payment_verification')
      ->count();
    $orderProcessingCount = $franchise->orders()
      ->whereStatus('processing')
      ->count();

    return Inertia::render(
      'Admin/Dashboard/Index',
      compact(
        'franchise',
        'orderWaitingPaymentVerificationCount',
        'orderProcessingCount'
      )
    );
  }
}
