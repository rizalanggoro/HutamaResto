<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerDashboardController extends Controller {
    public function show() {
        $user = Auth::user();
        return Inertia::render("Customer/Dashboard/Index", [
            'user' => $user,
        ]);
    }
}
