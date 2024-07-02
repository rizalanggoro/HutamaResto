<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminReviewController extends Controller {
    public function show() {
        $franchise = Auth::user()->franchise()->firstOrFail();
        $reviews = $franchise->reviews()
            ->orderBy('created_at', 'desc')
            ->with(['user'])
            ->get();

        return Inertia::render(
            'Admin/Dashboard/Review/Index',
            compact('reviews')
        );
    }
}
