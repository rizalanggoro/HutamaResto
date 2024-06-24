<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerComplaintController extends Controller {
    public function show() {
        return Inertia::render('Customer/Dashboard/Complaint/Index');
    }
}
