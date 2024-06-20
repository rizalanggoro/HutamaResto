<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Storage;

class CustomerPaymentController extends Controller {
    public function uploadReceipt(Request $request) {
        $order = Order::whereId($request->orderId)->firstOrFail();
        $path = Storage::disk('public')->put('receipts', $request->file('receipt'));

        $order->receipt_path = $path;
        $order->status = 'waiting_payment_verification';
        $order->save();

        return response(null, Response::HTTP_OK);
    }
}
