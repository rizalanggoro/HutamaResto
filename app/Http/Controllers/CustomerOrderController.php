<?php

namespace App\Http\Controllers;

use App\Models\Franchise;
use App\Models\Order;
use App\Models\OrderItem;
use Auth;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Storage;

class CustomerOrderController extends Controller {
  public function show(Request $request) {
    $user = Auth::user();
    $orders = $user->orders()
      ->orderBy('created_at', 'desc')
      ->where(function (Builder $query) use ($request) {
        $status = $request->query('status', 'all');
        return $status === 'all' ? $query : $query->whereStatus($status);
      })
      ->with(['franchise', 'orderItems', 'orderItems.menu'])
      ->withCount('reviews')
      ->get();

    return Inertia::render("Customer/Dashboard/Order/Index", [
      'user' => $user,
      'orders' => $orders,
    ]);
  }

  public function showChooseRestaurant() {
    $franchises = collect(Franchise::orderBy('name')->get())
      ->map(function ($item) {
        $item->image = Storage::disk('public')->url($item->image);
        return $item;
      });

    return Inertia::render(
      'Customer/Dashboard/Order/Create/ChooseRestaurant',
      compact('franchises')
    );
  }

  public function showChooseMenu(Request $request,  $franchiseId) {
    $franchise = Franchise::whereId($franchiseId)->firstOrFail();
    $menus = collect(
      $franchise->menus()
        ->orderBy('name')
        ->where(function (Builder $query) use ($request) {
          $type = $request->query('type', 'all');
          return $type === 'all' ? $query : $query->whereType($type);
        })
        ->get()
    )->map(function ($item) {
      $item->image = Storage::disk('public')->url($item->image);
      return $item;
    });

    return Inertia::render(
      'Customer/Dashboard/Order/Create/ChooseMenu',
      compact('franchise', 'menus')
    );
  }

  public function showDetail($id) {
    $order = Order::whereId($id)
      ->with(['franchise', 'orderItems', 'orderItems.menu'])
      ->firstOrFail();

    return Inertia::render(
      'Customer/Dashboard/Order/Detail',
      compact('order')
    );
  }

  public function create(Request $request) {
    try {
      DB::transaction(function () use ($request) {
        $userId = Auth::user()->id;
        $orderItems = $request->orderItems;

        if ($order = Order::create([
          'user_id' => $userId,
          'franchise_id' => $request->franchiseId,
          'message' => $request->message,
          'type' => $request->type,
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
    } catch (Exception $e) {
      return response($e->getMessage(), 500);
    }
  }

  public function delete($id) {
    $order = Order::whereId($id)->firstOrFail();
    $order->delete();

    return response(null, Response::HTTP_OK);
  }
}
