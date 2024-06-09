<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller {
    public function showCustomerLogin() {
        return Inertia::render('Auth/V2/Login', [
            'role' => 0,
        ]);
    }

    public function showCustomerRegister() {
        return Inertia::render('Auth/V2/Register');
    }

    public function showAdminLogin() {
        return Inertia::render('Auth/V2/Login', [
            'role' => 1,
        ]);
    }

    public function showSuperAdminLogin() {
        return Inertia::render('Auth/V2/Login', [
            'role' => 2,
        ]);
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => ['email', 'string', 'required'],
            'password' => ['string', 'required'],
            'role' => ['numeric', 'required'],
        ], [
            'email.email' => 'Alamat email tidak valid!',
            'email.required' => 'Alamat email tidak boleh kosong!',
            'email.string' => 'Alamat email tidak boleh kosong!',
            'password.required' => 'Kata sandi tidak boleh kosong!', 'password.string' => 'Kata sandi tidak boleh kosong!'
        ]);

        if (Auth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
            'id_role' => $credentials['role'],
        ])) {
            $request->session()->regenerate();
            $routes = [
                0 => 'dashboard',
                1 => 'admin.dashboard',
                2 => 'superadmin.dashboard',
            ];
            $route  = $routes[$credentials['role']];

            return redirect()->intended(route($route));
        }

        return back()->withErrors(['email' => 'Informasi yang Anda masukkan tidak valid!']);
    }

    public function register(Request $request) {
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerate();

        return redirect(route('home'));
    }
}
