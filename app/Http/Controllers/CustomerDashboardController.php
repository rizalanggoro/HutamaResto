<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerDashboardController extends Controller {
    public function show() {
        return Inertia::render("Customer/Dashboard/Index");
    }
}
