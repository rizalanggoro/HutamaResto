<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminDashboardController extends Controller {
    public function show() {
        $user = Auth::user();
        $franchise = $user->franchise()->first();

        return Inertia::render('Admin/Dashboard/Index', [
            'user' => $user,
            'franchise' => $franchise,
        ]);
    }
}
