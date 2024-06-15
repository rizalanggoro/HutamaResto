<?php

namespace App\Http\Controllers;

use App\Models\Franchise;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller {
    public function show() {
        $franchises = Franchise::orderBy('name')->limit(4)->get();
        $user = Auth::user();

        return Inertia::render(
            'LandingPage',
            compact('franchises', 'user'),
        );
    }
}
