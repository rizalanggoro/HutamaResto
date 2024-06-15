<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerProfileController extends Controller {
    public function show() {
        return Inertia::render('Customer/Dashboard/Profile/Index',);
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
