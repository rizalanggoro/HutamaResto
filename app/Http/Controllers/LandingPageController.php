<?php

namespace App\Http\Controllers;

use App\Models\Franchise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller {
    public function show() {
        $franchises = Franchise::orderBy('name')->get();

        return Inertia::render('LandingPage', [
            'franchises' => $franchises,
        ]);
    }
}
