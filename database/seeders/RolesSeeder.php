<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        DB::table('roles')->insert([
            ['id' => 0, 'name' => 'Customer'],
            ['id' => 1, 'name' => 'Admin'],
            ['id' => 2, 'name' => 'Admin Pusat'],
        ]);
    }
}
