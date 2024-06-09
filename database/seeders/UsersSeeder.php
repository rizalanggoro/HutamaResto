<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        User::factory()->create([
            'name' => 'Customer User',
            'email' => 'customer@example.com',
            'id_role' => 0,
        ]);

        for ($a = 0; $a < 5; $a++) {
            User::factory()->create([
                'name' => 'Admin ' . ($a + 1) . ' User',
                'email' => 'admin' . ($a + 1) . '@example.com',
                'id_role' => 1,
            ]);
        }

        User::factory()->create([
            'name' => 'Superadmin User',
            'email' => 'superadmin@example.com',
            'id_role' => 2,
        ]);
    }
}
