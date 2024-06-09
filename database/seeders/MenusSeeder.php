<?php

namespace Database\Seeders;

use App\Models\Franchise;
use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenusSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $franchises = Franchise::all();
        foreach ($franchises as $franchise) {
            for ($food = 0; $food < 8; $food++) {
                Menu::create([
                    'id_franchise' => $franchise->id,
                    'name' => 'Makanan ke-' . $food,
                    'description' => 'Deskripsi untuk makanan ke-' . $food,
                    'availability' => true,
                    'type' => 'food',
                ]);
            }

            for ($beverage = 0; $beverage < 5; $beverage++) {
                Menu::create([
                    'id_franchise' => $franchise->id,
                    'name' => 'Minuman ke-' . $beverage,
                    'description' => 'Deskripsi untuk minuman ke-' . $beverage,
                    'availability' => true,
                    'type' => 'beverage',
                ]);
            }
        }
    }
}
