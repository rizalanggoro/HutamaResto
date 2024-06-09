<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminDashboardController extends Controller {
    public function show() {
        $franchise = Auth::user()->franchise()->get();

        return Inertia::render('Admin/Dashboard/Index', [
            'franchise' => $franchise,
        ]);
    }
}
