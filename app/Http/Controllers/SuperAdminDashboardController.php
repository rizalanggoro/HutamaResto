<?php

namespace App\Http\Controllers;

use Auth;
use Inertia\Inertia;
use Inertia\Response;

class SuperAdminDashboardController extends Controller {
  public function show(): Response {
    $user = Auth::user();

    return Inertia::render('SuperAdmin/Dashboard/Index', [
      'user' => $user,
    ]);
  }
}
