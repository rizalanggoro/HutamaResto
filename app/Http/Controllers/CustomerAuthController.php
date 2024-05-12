<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomerAuthController extends Controller {
    public function showLogin() {
        return Inertia::render('Customer/Login');
    }

    public function showRegister() {
        return Inertia::render('Customer/Login');
    }

    public function login(Request $request): RedirectResponse {
        $credentials = $request->validate([
            'email' => ['string', 'required', 'email'],
            'password' => ['string', 'required'],
        ]);

        if (Auth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
            'id_role' => 0,
        ])) {
            $request->session()->regenerate();
            return redirect()->intended(route('dashboard'));
        }

        return back()->withErrors([
            'email' => 'Alamat email yang Anda masukkan tidak valid!',
        ])->onlyInput('email');
    }

    public function register(Request $request) {
    }

    public function logout(Request $request): RedirectResponse {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerate();
        return redirect(route('home'));
    }
}
