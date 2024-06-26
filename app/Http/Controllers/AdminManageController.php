<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use DB;
use Exception;
use Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminManageController extends Controller {
    public function show() {
        $franchise = Auth::user()->franchise()->firstOrFail();
        $users = $franchise->users()->get();

        return Inertia::render(
            'Admin/Dashboard/ManageAdmin/Index',
            compact('franchise', 'users')
        );
    }

    public function showCreate() {
        return Inertia::render('Admin/Dashboard/ManageAdmin/Create');
    }

    public function create(Request $request) {
        $credentials = $request->validate([
            'name' => ['string', 'required'],
            'email' => ['email', 'string', 'required', 'unique:users'],
            'password' => ['string', 'required'],
            'confirmPassword' => ['string', 'required', 'same:password'],
        ], [
            'name.string' => 'Nama lengkap tidak boleh kosong!',
            'name.required' => 'Nama lengkap tidak boleh kosong!',
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

        try {
            DB::transaction(function () use ($credentials) {
                $franchise = Auth::user()->franchise()->firstOrFail();

                $user = User::create([
                    'name' => $credentials['name'],
                    'email' => $credentials['email'],
                    'password' => Hash::make($credentials['password']),
                    'role' => 'admin',
                ]);
                DB::table('admin_franchise')->insert([
                    'user_id' => $user->id,
                    'franchise_id' => $franchise->id,
                ]);
            });

            return redirect()->intended(route('admin.dashboard.manageAdmin'));
        } catch (Exception $e) {
            return back()->withErrors([
                'email' => 'Informasi yang Anda masukkan tidak valid!',
            ]);
        }
    }

    function delete($id) {
        $user = User::whereId($id)->firstOrFail();
        $user->delete();
    }
}
