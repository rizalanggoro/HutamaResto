<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class CustomerReviewController extends Controller {
    public function show() {
        $reviews = Auth::user()->reviews()
            ->orderBy('created_at', 'desc')
            ->with(['franchise'])
            ->get();

        return Inertia::render(
            'Customer/Dashboard/Review/Index',
            compact('reviews')
        );
    }

    public function create(Request $request) {
        if (Review::create([
            'star' => $request->star,
            'review' => $request->review,
            'user_id' => Auth::user()->id,
            'order_id' => $request->orderId,
            'franchise_id' => $request->franchiseId,
        ])) {
            return response(null, Response::HTTP_OK);
        } else {
            return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
