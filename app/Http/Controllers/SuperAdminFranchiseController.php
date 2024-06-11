<?php

namespace App\Http\Controllers;

use App\Models\Franchise;
use Inertia\Inertia;
use Inertia\Response;

class SuperAdminFranchiseController extends Controller {
  public function show(): Response {
    $franchises = Franchise::orderBy('name')->get();

    return Inertia::render('SuperAdmin/Dashboard/Franchise/Index', [
      'franchises' => $franchises,
    ]);
  }

  public function showCreate(): Response {
    return Inertia::render('SuperAdmin/Dashboard/Franchise/Create');
  }
}
