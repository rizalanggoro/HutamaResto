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
    $franchiseIncomes = Franchise::all()->map(function ($q) {
      $q->income = $q->incomeThisMonth();
      return $q;
    });

    return Inertia::render(
      'SuperAdmin/Dashboard/Index',
      compact(
        'franchiseCount',
        'orderCount',
        'franchiseIncomes',
      )
    );
  }
}
