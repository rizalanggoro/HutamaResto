<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Storage;

class CustomerProfileController extends Controller {
    public function show() {
        return Inertia::render('Customer/Dashboard/Profile/Index',);
    }

    public function update(Request $request) {
        $request->validate([
            'name' => ['required', 'string'],
            'address' => ['required', 'string'],
        ], [
            'name.required' => 'Nama tidak boleh kosong!',
            'name.string' => 'Nama tidak boleh kosong!',
            'address.required' => 'Alamat tidak boleh kosong!',
            'address.string' => 'Alamat tidak boleh kosong!',
        ]);

        $user = Auth::user();
        $user->name = $request->name;
        $user->address = $request->address;
        if ($request->hasFile('image')) {
            $path = Storage::disk('public')->put('users', $request->file('image'));
            $user->image = $path;
        }
        $user->save();

        return back();
    }
}
