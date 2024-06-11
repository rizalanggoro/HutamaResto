<?php

namespace App\Http\Controllers;

use App\Models\Franchise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminProfileController extends Controller {
    public function show() {
        $franchise = Auth::user()->franchise()->first();

        return Inertia::render('Admin/Dashboard/Profile/Index', [
            'franchise' => $franchise,
        ]);
    }

    public function update(Request $request) {
        $franchise = Franchise::whereId($request->id_franchise)->first();
        $franchise->name = $request->name;
        $franchise->save();

        return back();
    }
}
