<?php

namespace App\Http\Controllers;

use App\Models\Franchise;
use App\Models\User;
use DB;
use Exception;
use Hash;
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
      'adminName' => ['required', 'string'],
      'adminEmail' => ['required', 'string', 'email', 'unique:users,email'],
      'adminPassword' => ['required', 'string'],
    ], [
      'image.required' => 'Gambar restoran tidak boleh kosong!',
      'image.file' => 'Gambar restoran tidak boleh kosong!',
      'name.required' => 'Nama restoran tidak boleh kosong!',
      'name.string' => 'Nama restoran tidak boleh kosong!',
      'address.required' => 'Alamat restoran tidak boleh kosong!',
      'address.string' => 'Alamat restoran tidak boleh kosong!',
      'adminName.required' => 'Nama admin tidak boleh kosong!',
      'adminName.string' => 'Nama admin tidak boleh kosong!',
      'adminEmail.required' => 'Alamat email admin tidak boleh kosong!',
      'adminEmail.string' => 'Alamat email admin tidak boleh kosong!',
      'adminEmail.email' => 'Alamat email admin tidak valid!',
      'adminEmail.unique' => 'Alamat email admin sudah terdaftar!',
      'adminPassword.required' => 'Kata sandi admin tidak boleh kosong!',
      'adminPassword.string' => 'Kata sandi admin tidak boleh kosong!',
    ]);

    try {
      DB::transaction(function () use ($request) {
        $user = User::create([
          'name' => $request->adminName,
          'email' => $request->adminEmail,
          'password' => Hash::make($request->adminPassword),
          'role' => 'admin',
        ]);

        $imagePath = Storage::disk('public')->put('restaurants', $request->file('image'));
        if ($imagePath) {
          $franchise = Franchise::create([
            'image' => $imagePath,
            'name' => $request->name,
            'address' => $request->address,
          ]);

          DB::table('admin_franchise')->insert([
            'user_id' => $user->id,
            'franchise_id' => $franchise->id,
          ]);
        }
      });
      return redirect()->route('superadmin.dashboard.franchise');
    } catch (Exception $e) {
      return back()->withErrors([
        'name' => 'Terjadi kesalahan tidak terduga pada server!'
      ]);
    }
  }

  public function delete($id) {
    $franchise = Franchise::whereId($id)->firstOrFail();
    $franchise->delete();
  }
}
