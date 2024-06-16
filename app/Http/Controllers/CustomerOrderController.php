<?php

namespace App\Http\Controllers;

use App\Models\Franchise;
use App\Models\Order;
use App\Models\OrderItem;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CustomerOrderController extends Controller {
  public function show() {
    $user = Auth::user();
    $orders = $user->orders()->with('franchise')->get();

    return Inertia::render("Customer/Dashboard/Order/Index", [
      'user' => $user,
      'orders' => $orders,
    ]);
  }

  public function showChooseRestaurant() {
    $franchises = Franchise::orderBy('name')->get();
    return Inertia::render('Customer/Dashboard/Order/Create/ChooseRestaurant', compact('franchises'));
  }

  public function showChooseMenu($franchiseId) {
    $franchise = Franchise::whereId($franchiseId)->firstOrFail();
    $menus = $franchise->menus()->get();
    return Inertia::render(
      'Customer/Dashboard/Order/Create/ChooseMenu',
      compact('franchise', 'menus')
    );
  }

  public function showDetail($id_order) {
    $order = Order::whereId($id_order)->with(['franchise', 'orderItems', 'orderItems.menu'])->first();

    return Inertia::render('Customer/Dashboard/Order/Detail', [
      'order' => $order,
    ]);
  }

  public function create(Request $request) {
    DB::transaction(function () use ($request) {
      $userId = Auth::user()->id;
      $orderItems = $request->orderItems;

      if ($order = Order::create([
        'user_id' => $userId,
        'franchise_id' => $request->franchiseId,
      ])) {
        foreach ($orderItems as $orderItem) {
          OrderItem::create([
            'order_id' => $order->id,
            'menu_id' => $orderItem['menuId'],
            'count' => $orderItem['count'],
          ]);
        }
      }
    });

    return response(null, 200);
  }
}
