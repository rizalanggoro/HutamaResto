<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminOrderController extends Controller {
    public function show() {
        $orders = Auth::user()->franchise()->first()->orders()->with(['user', 'orderItems'])->get();

        return Inertia::render('Admin/Dashboard/Order/Index', [
            'orders' => $orders,
        ]);
    }
}
