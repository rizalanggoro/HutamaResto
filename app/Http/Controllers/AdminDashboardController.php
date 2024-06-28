<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Storage;

class AdminDashboardController extends Controller {
  public function show() {
    $user = Auth::user();
    $franchise = $user->franchise()->firstOrFail();
    $franchise->image = Storage::disk('public')->url($franchise->image);

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

  public function updateOpenStatus() {
    $franchise = Auth::user()->franchise()->firstOrFail();
    $franchise->is_open = $franchise->is_open === 0 ? 1 : 0;
    $franchise->save();
  }
}
