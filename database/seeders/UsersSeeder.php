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
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'id_role' => 1,
        ]);
        User::factory()->create([
            'name' => 'Central Admin User',
            'email' => 'centraladmin@example.com',
            'id_role' => 2,
        ]);
    }
}
