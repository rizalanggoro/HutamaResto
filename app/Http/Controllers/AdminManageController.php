<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminManageController extends Controller {
    public function show() {
        $franchise = Auth::user()->franchise()->firstOrFail();
        $users = $franchise->users()->get();

        return Inertia::render(
            'Admin/Dashboard/Manage/Index',
            compact('franchise', 'users')
        );
    }
}
