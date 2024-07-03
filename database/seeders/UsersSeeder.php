<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        User::factory()->create([
            'name' => 'Customer User',
            'email' => 'customer@example.com',
            'address' => fake()->address(),
        ]);

        for ($a = 0; $a < 5; $a++) {
            User::factory()->create([
                'name' => 'Admin ' . ($a + 1) . ' User',
                'email' => 'admin' . ($a + 1) . '@example.com',
                'role' => 'admin',
            ]);
        }

        User::factory()->create([
            'name' => 'Superadmin User',
            'email' => 'superadmin@example.com',
            'role' => 'superadmin',
        ]);
    }
}
