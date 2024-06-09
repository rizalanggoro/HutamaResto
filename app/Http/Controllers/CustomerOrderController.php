<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerOrderController extends Controller {
    public function show() {
        return Inertia::render("Customer/Dashboard/Order/Index");
    }

    public function showCreate() {
        return Inertia::render("Customer/Dashboard/Order/Create");
    }
}
