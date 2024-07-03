<?php

namespace App\Http\Controllers;

use App\Models\Franchise;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Storage;

class PublicController extends Controller {
    public function show() {
        $franchises = collect(Franchise::orderBy('name')->limit(4)->get())
            ->map(function (Franchise $item) {
                $item->image = Storage::disk('public')->url($item->image);
                return $item;
            });

        return Inertia::render(
            'Public/LandingPage',
            compact('franchises'),
        );
    }

    public function showFranchise() {
        $franchises = collect(Franchise::orderBy('name')->get())
            ->map(function (Franchise $item) {
                $item->image = Storage::disk('public')->url($item->image);
                return $item;
            });

        return Inertia::render(
            'Public/Franchise/Index',
            compact('franchises'),
        );
    }

    public function showFranchiseDetail($id) {
        $franchise = Franchise::whereId($id)->firstOrFail();
        $franchise->image = Storage::disk('public')->url($franchise->image);
        $menus = collect($franchise->menus()->orderBy('name')->get())
            ->map(function ($item) {
                $item->image = Storage::disk('public')->url($item->image);
                return $item;
            });
        $reviews = $franchise->reviews()
            ->orderBy('created_at', 'desc')
            ->with(['user'])
            ->get();

        return Inertia::render(
            'Public/Franchise/Detail',
            compact('franchise', 'menus', 'reviews')
        );
    }

    public function showMenu() {
        $menus = collect(Menu::orderBy('name')->get())
            ->map(function (Menu $menu) {
                $menu->image = Storage::disk('public')->url($menu->image);
                return $menu;
            })
            ->unique('name')
            ->values()
            ->all();

        return Inertia::render(
            'Public/Menu/Index',
            compact('menus')
        );
    }
}
