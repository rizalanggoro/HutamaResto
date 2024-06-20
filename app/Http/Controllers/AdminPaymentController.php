<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPaymentController extends Controller {
    public function show() {
        return Inertia::render('Admin/Dashboard/Payment/Index');
    }
}
