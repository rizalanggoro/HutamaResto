<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminMenuController extends Controller {
  public function show(Request $request) {
    $franchise = Auth::user()->franchise()->first();
    $menus = $franchise->menus()->where(function (Builder $query) use ($request) {
      $filter = $request->query('filter', 'all');
      return $filter === 'all' ? $query : $query->whereType($filter);
    })->withCount('orderItems')->get(); // perlu di update bagian ini, supaya cuma order yang aktif yang dapat mencegah penghapusan 

    return Inertia::render(
      'Admin/Dashboard/Menu/Index',
      compact('franchise', 'menus')
    );
  }

  public function showCreate() {
    $franchise = Auth::user()->franchise()->first();
    return Inertia::render('Admin/Dashboard/Menu/Create', [
      'idFranchise' => $franchise->id,
    ]);
  }

  public function create(Request $request) {
    $credentials = $request->validate([
      'idFranchise' => ['required', 'numeric'],
      'name' => ['required'],
      'description' => ['required'],
      'availability' => ['boolean', 'required'],
      'type' => ['required'],
    ], [
      'name.required' => 'Nama menu tidak boleh kosong!',
      'description.required' => 'Deskripsi menu tidak boleh kosong!',
      'availability.required' => 'Ketersediaan menu tidak boleh kosong!',
      'type.required' => 'Tipe menu tidak boleh kosong!',
    ]);

    if (Menu::create([
      'id_franchise' => $credentials['idFranchise'],
      'name' => $credentials['name'],
      'description' => $credentials['description'],
      'availability' => $credentials['availability'],
      'type' => $credentials['type'],
    ])) {
      return redirect()->route('admin.dashboard.menu');
    }

    return back()->withErrors(['name' => 'Terjadi kesalahan tak terduga!']);
  }

  public function updateAvailability(Request $request, $id) {
    if (Menu::whereId($id)->update(['availability' => $request->availability]))
      return response(null, Response::HTTP_OK);
    else
      return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
  }

  public function delete($id) {
    $menu = Menu::find($id);

    if ($menu->delete())
      return response(null, Response::HTTP_OK);
    else
      return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
  }
}
