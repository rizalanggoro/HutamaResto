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
        $admins = User::whereIdRole(1)->get();

        foreach ($franchises as $index => $franchise) {
            DB::table('admin_franchise')->insert([
                'id_admin' => $admins[$index]->id,
                'id_franchise' => $franchise->id,
            ]);
        }
    }
}
