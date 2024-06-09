<?php

namespace Database\Seeders;

use App\Models\Franchise;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FranchisesSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        for ($a = 0; $a < 5; $a++) {
            Franchise::create([
                'name' => 'HutamaResto: ' . fake()->streetName(),
                'address' => fake()->address(),
            ]);
        }
    }
}
