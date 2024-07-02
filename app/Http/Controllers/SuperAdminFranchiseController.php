<?php

namespace App\Http\Controllers;

use App\Models\Franchise;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Storage;

class SuperAdminFranchiseController extends Controller {
  public function show(): Response {
    $franchises = collect(
      Franchise::orderBy('name')->get()
    )->map(function ($franchise) {
      $franchise->image = Storage::disk('public')->url($franchise->image);
      return $franchise;
    });

    return Inertia::render(
      'SuperAdmin/Dashboard/Franchise/Index',
      compact('franchises')
    );
  }

  public function showCreate(): Response {
    return Inertia::render('SuperAdmin/Dashboard/Franchise/Create');
  }

  public function create(Request $request) {
    $request->validate([
      'image' => ['required', 'file'],
      'name' => ['required', 'string'],
      'address' => ['required', 'string'],
    ], [
      'image.required' => 'Gambar restoran tidak boleh kosong!',
      'image.file' => 'Gambar restoran tidak boleh kosong!',
      'name.required' => 'Nama restoran tidak boleh kosong!',
      'name.string' => 'Nama restoran tidak boleh kosong!',
      'address.required' => 'Alamat restoran tidak boleh kosong!',
      'address.string' => 'Alamat restoran tidak boleh kosong!',
    ]);

    $imagePath = Storage::disk('public')->put('restaurants', $request->file('image'));
    if ($imagePath)
      if (Franchise::create([
        'image' => $imagePath,
        'name' => $request->name,
        'address' => $request->address,
      ])) {
        return redirect()->route('superadmin.dashboard.franchise');
      }

    return back()->withErrors([
      'name' => 'Terjadi kesalahan tidak terduga pada server!'
    ]);
  }

  public function delete($id) {
    $franchise = Franchise::whereId($id)->firstOrFail();
    $franchise->delete();
  }
}
