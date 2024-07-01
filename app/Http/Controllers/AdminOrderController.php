<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Http;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Storage;

class AdminOrderController extends Controller {
    public function show() {
        $franchise = Auth::user()->franchise()->firstOrFail();
        $orders = $franchise->orders()
            ->orderBy('created_at', 'desc')
            ->whereStatus('processing')
            ->with('user')
            ->withCount('orderItems')
            ->get();

        return Inertia::render(
            'Admin/Dashboard/Order/Index',
            compact('orders'),
        );
    }

    public function showPaymentVerification() {
        $franchise = Auth::user()->franchise()->firstOrFail();
        $orders = collect(
            $franchise->orders()
                ->orderBy('created_at', 'desc')
                ->whereStatus('waiting_payment_verification')
                ->with(['user', 'orderItems', 'orderItems.menu'])
                ->get()
        )->map(function ($item) {
            $item->receipt_path = Storage::disk('public')->url($item->receipt_path);
            return $item;
        });

        return Inertia::render(
            'Admin/Dashboard/Order/PaymentVerification',
            compact('orders')
        );
    }

    public function verifyPayment($orderId) {
        $order = Order::whereId($orderId)->firstOrFail();
        $order->status = 'processing';
        $order->save();

        return response(null, Response::HTTP_OK);
    }

    public function showDetail($orderId) {
        $order = Order::whereId($orderId)
            ->with(['user', 'orderItems', 'orderItems.menu', 'franchise'])
            ->firstOrFail();

        return Inertia::render(
            'Admin/Dashboard/Order/Detail',
            compact('order')
        );
    }

    public function updateIsDoneOrderItem(Request $request, $orderItemId) {
        $orderItem = OrderItem::whereId($orderItemId)->firstOrFail();
        $orderItem->is_done = $request->isDone;
        $orderItem->save();

        return response(null, Response::HTTP_OK);
    }

    public function markOrderAsDone($orderId) {
        $order = Order::whereId($orderId)->firstOrFail();
        $orderItems = $order->orderItems()->get();

        DB::transaction(function () use ($order, $orderItems) {
            $order->status = $order->type === 'delivery-order' ? 'delivering' : 'done';
            $order->save();

            $orderItems->toQuery()->update(['is_done' => 1]);
        });

        return response(null, Response::HTTP_OK);
    }

    public function showDelivering() {
        $orders = Order::whereStatus('delivering')
            ->with(['user'])
            ->orderBy('created_at')
            ->get();

        return Inertia::render(
            'Admin/Dashboard/Order/Delivering',
            compact('orders')
        );
    }

    public function showDeliveringDetail($id) {
        $order = Order::whereId($id)
            ->with(['user', 'orderItems', 'orderItems.menu', 'franchise'])
            ->firstOrFail();

        return Inertia::render(
            'Admin/Dashboard/Order/Delivering/Detail',
            compact('order')
        );
    }

    public function markDeliveringAsDone($id) {
        $order = Order::whereId($id)->firstOrFail();
        $order->status = 'done';

        if ($order->save()) {
            return response(null, Response::HTTP_OK);
        } else {
            return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
