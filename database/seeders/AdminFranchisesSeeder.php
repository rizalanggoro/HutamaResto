<?php

namespace Database\Seeders;

use App\Models\Franchise;
use App\Models\User;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminFranchisesSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $franchises = Franchise::all();
        $users = User::whereRole('admin')->get();

        foreach ($franchises as $index => $franchise) {
            DB::table('admin_franchise')->insert([
                'user_id' => $users[$index]->id,
                'franchise_id' => $franchise->id,
            ]);
        }
    }
}
