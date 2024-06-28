<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Storage;

class AdminMenuController extends Controller {
  public function show(Request $request) {
    $franchise = Auth::user()->franchise()->first();
    $menus = collect($franchise->menus()
      ->where(function (Builder $query) use ($request) {
        $type = $request->query('type', 'all');
        return $type === 'all' ? $query : $query->whereType($type);
      })
      ->where(function (Builder $query) use ($request) {
        $availability =  $request->query('availability', 'all');
        return $availability === 'all' ? $query : $query->whereAvailability($availability === 'available');
      })
      ->orderBy('name')
      ->get())
      ->map(function ($item) {
        $item->image = Storage::disk('public')->url($item->image);
        return $item;
      });

    return Inertia::render(
      'Admin/Dashboard/Menu/Index',
      compact('franchise', 'menus')
    );
  }

  public function showCreate() {
    $franchise = Auth::user()->franchise()->firstOrFail();

    return Inertia::render(
      'Admin/Dashboard/Menu/Create',
      compact('franchise')
    );
  }

  public function create(Request $request) {
    $credentials = $request->validate([
      'image' => ['required'],
      'name' => ['required'],
      'description' => ['required'],
      'availability' => ['boolean', 'required'],
      'type' => ['required'],
      'price' => ['required', 'numeric'],
    ], [
      'image.required' => 'Gambar menu tidak boleh kosong!',
      'image.file' => 'Gambar menu tidak boleh kosong!',
      'name.required' => 'Nama menu tidak boleh kosong!',
      'description.required' => 'Deskripsi menu tidak boleh kosong!',
      'availability.required' => 'Ketersediaan menu tidak boleh kosong!',
      'type.required' => 'Tipe menu tidak boleh kosong!',
      'price.required' => 'Harga menu tidak boleh kosong!',
      'price.number' => 'Harga menu tidak boleh kosong!',
    ]);

    $franchise = Auth::user()->franchise()->firstOrFail();

    if (Menu::create([
      'franchise_id' => $franchise->id,
      'image' => Storage::disk('public')->put('menus', $request->file('image')),
      'name' => $credentials['name'],
      'description' => $credentials['description'],
      'availability' => $credentials['availability'],
      'type' => $credentials['type'],
      'price' => $credentials['price'],
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
