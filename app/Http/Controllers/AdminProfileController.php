<?php

namespace App\Http\Controllers;

use App\Models\Franchise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Storage;

class AdminProfileController extends Controller {
  public function show() {
    $franchise = Auth::user()->franchise()
      ->firstOrFail();
    $franchise->image = Storage::disk('public')->url($franchise->image);

    return Inertia::render('Admin/Dashboard/Profile/Index', [
      'franchise' => $franchise,
    ]);
  }

  public function update(Request $request) {
    $request->validate([
      'name' => ['required', 'string'],
      'address' => ['required', 'string'],
    ], [
      'name.required' => 'Nama restoran tidak boleh kosong!',
      'name.string' => 'Nama restoran tidak boleh kosong!',
      'address.required' => 'Alamat restoran tidak boleh kosong!',
      'address.string' => 'Alamat restoran tidak boleh kosong!',
    ]);

    $user = Auth::user();
    $franchise = $user->franchise()->firstOrFail();

    $franchise->name = $request->name;
    $franchise->address = $request->address;
    if ($request->hasFile('image')) {
      if (
        $franchise->image !== null &&
        !str_contains($franchise->image, 'seeder')
      )
        Storage::disk('public')->delete($franchise->image);
      $franchise->image = Storage::disk('public')->put('restaurants', $request->file('image'));
    }
    $franchise->save();

    return back();
  }
}
