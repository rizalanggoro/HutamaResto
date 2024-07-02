<?php

namespace App\Http\Controllers;

use App\Models\AdminFranchise;
use App\Models\User;
use DB;
use Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller {
  public function showCustomerLogin(): Response {
    return Inertia::render('Auth/Login', [
      'role' => 'customer',
    ]);
  }

  public function showCustomerRegister(): Response {
    return Inertia::render('Auth/Register');
  }

  public function showAdminLogin(): Response {
    return Inertia::render('Auth/Login', [
      'role' => 'admin',
    ]);
  }

  public function showSuperAdminLogin(): Response {
    return Inertia::render('Auth/Login', [
      'role' => 'superadmin',
    ]);
  }

  public function login(Request $request): RedirectResponse {
    $credentials = $request->validate([
      'email' => ['email', 'string', 'required'],
      'password' => ['string', 'required'],
      'role' => ['string', 'required'],
    ], [
      'email.email' => 'Alamat email tidak valid!',
      'email.required' => 'Alamat email tidak boleh kosong!',
      'email.string' => 'Alamat email tidak boleh kosong!',
      'password.required' => 'Kata sandi tidak boleh kosong!',
      'password.string' => 'Kata sandi tidak boleh kosong!'
    ]);

    $user = User::whereEmail($request->email)->first();
    if (!$user) {
      return back()->withErrors(['email' => 'Informasi yang Anda masukkan tidak valid!']);
    }

    if (AdminFranchise::where('user_id', '=', $user->id)->count() === 0) {
      return back()->withErrors(['email' => 'Informasi yang Anda masukkan tidak valid!']);
    }

    if (Auth::attempt([
      'email' => $credentials['email'],
      'password' => $credentials['password'],
      'role' => $credentials['role'],
    ])) {
      $request->session()->regenerate();
      $routes = [
        'customer' => 'dashboard',
        'admin' => 'admin.dashboard',
        'superadmin' => 'superadmin.dashboard',
      ];
      $route = $routes[$credentials['role']];

      return redirect()->intended(route($route));
    }

    return back()->withErrors(['email' => 'Informasi yang Anda masukkan tidak valid!']);
  }

  public function register(Request $request) {
    $credentials = $request->validate([
      'name' => ['string', 'required'],
      'email' => ['email', 'string', 'required', 'unique:users'],
      'password' => ['string', 'required'],
      'confirmPassword' => ['string', 'required', 'same:password'],
    ], [
      'email.email' => 'Alamat email tidak valid!',
      'email.required' => 'Alamat email tidak boleh kosong!',
      'email.string' => 'Alamat email tidak boleh kosong!',
      'email.unique' => 'Alamat email yang Anda gunakan sudah terdaftar!',
      'password.required' => 'Kata sandi tidak boleh kosong!',
      'password.string' => 'Kata sandi tidak boleh kosong!',
      'confirmPassword.required' => 'Konfirmasi kata sandi tidak boleh kosong!',
      'password.string' => 'Konfirmasi kata sandi tidak boleh kosong!',
      'confirmPassword.same' => 'Konfirmasi kata sandi tidak cocok!',
    ]);

    if (User::create([
      'name' => $credentials['name'],
      'email' => $credentials['email'],
      'password' => Hash::make($credentials['password']),
      'role' => 'customer',
    ])) {
      if (Auth::attempt([
        'email' => $credentials['email'],
        'password' => $credentials['password'],
        'role' => 'customer',
      ])) {
        $request->session()->regenerate();
        return redirect()->intended(route('dashboard'));
      }
    }

    return back()->withErrors(['email' => 'Informasi yang Anda masukkan tidak valid!']);
  }

  public function logout(Request $request): RedirectResponse {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerate();

    return redirect(route('home'));
  }
}
