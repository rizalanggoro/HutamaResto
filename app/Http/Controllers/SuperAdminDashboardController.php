<?php

namespace App\Http\Controllers;

use App\Models\Franchise;
use App\Models\Order;
use App\Models\OrderItem;
use Auth;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class SuperAdminDashboardController extends Controller {
  public function show(): Response {
    $franchiseCount = Franchise::count();
    $orderCount = Order::whereStatus('done')->count();
    $income = collect(
      OrderItem::with(['order', 'menu'])
        ->whereHas('order', function ($order) {
          return $order->whereStatus('done');
        })
        ->whereBetween('created_at', [
          Carbon::now()->startOfMonth(),
          Carbon::now()->endOfMonth(),
        ])
        ->get()
    )->sum(function ($item) {
      return  $item->count * $item->menu->price;
    });

    return Inertia::render(
      'SuperAdmin/Dashboard/Index',
      compact(
        'franchiseCount',
        'orderCount',
        'income',
      )
    );
  }
}
