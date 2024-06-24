<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Storage;

// deprecated
class AdminPaymentController extends Controller {
    public function show() {
        $franchise = Auth::user()->franchise()->firstOrFail();
        $orders = collect($franchise->orders()->with('user')->whereStatus('waiting_payment_verification')->get())->map(function ($order) {
            $newOrder = $order;
            $newOrder->receipt_path = Storage::disk('public')->url($order->receipt_path);
            return $newOrder;
        });

        return Inertia::render('Admin/Dashboard/Payment/Index', compact('orders'));
    }

    public function confirmPayment(Request $request) {
    }
}
