<?php

namespace App\Http\Controllers;

use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerDashboardController extends Controller {
    public function show() {
        $user = Auth::user();
        $orderDeliveringCount = $user->orders()
            ->whereStatus('delivering')
            ->count();
        $orderWaitingPaymentCount = $user->orders()
            ->whereStatus('waiting_payment')
            ->count();
        $ordersThisMonth = $user->orders()
            ->whereStatus('done')
            ->whereBetween('created_at', [
                Carbon::now()->startOfMonth(),
                Carbon::now()->endOfMonth(),
            ])
            ->with(['orderItems', 'orderItems.menu'])
            ->get();

        return Inertia::render(
            "Customer/Dashboard/Index",
            compact(
                'ordersThisMonth',
                'orderDeliveringCount',
                'orderWaitingPaymentCount',
            )
        );
    }
}
