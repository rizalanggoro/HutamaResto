<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerProfileController extends Controller {
    public function show() {
        $user = Auth::user();

        return Inertia::render('Customer/Dashboard/Profile/Index', [
            'user' => $user,
        ]);
    }

    public function update(Request $request) {
        $request->validate([
            'name' => ['required'],
        ]);

        $user = Auth::user();
        $user->name = $request->name;
        $user->save();

        return back();
    }
}
