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
        $orders = $user->orders()->with('Franchise')->get();

        return Inertia::render("Customer/Dashboard/Order/Index", [
            'user' => $user,
            'orders' => $orders,
        ]);
    }

    public function showCreate() {
        $franchises = Franchise::orderBy('name')->get();
        return Inertia::render("Customer/Dashboard/Order/Create", [
            'franchises' => $franchises,
        ]);
    }

    public function showDetail($id_order) {
        $order = Order::whereId($id_order)->with(['Franchise', 'orderItems', 'orderItems.menu'])->first();

        return Inertia::render('Customer/Dashboard/Order/Detail', [
            'order' => $order,
        ]);
    }

    public function create(Request $request) {
        DB::transaction(function () use ($request) {
            $idUser = Auth::user()->id;
            $orderItems = $request->order_items;

            if ($order = Order::create([
                'id_user' => $idUser,
                'id_franchise' => $request->id_franchise,
            ])) {
                foreach ($orderItems as $orderItem) {
                    OrderItem::create([
                        'id_order' => $order->id,
                        'id_menu' => $orderItem['id_menu'],
                        'count' => $orderItem['count'],
                    ]);
                }
            }
        });

        return response(null, 200);
    }

    public function getCreateFranchiseMenu($id_franchise) {
        $menus = Franchise::whereId($id_franchise)->first()->menus()->get();
        return ['menus' => $menus];
    }
}
