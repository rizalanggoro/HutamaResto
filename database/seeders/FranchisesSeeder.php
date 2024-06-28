<?php

namespace Database\Seeders;

use App\Models\Franchise;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Storage;

class FranchisesSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        foreach ([
            [
                'name' => 'HutamaResto: Magelang',
                'address' => 'Jalan Pahlawan No. 123, Kelurahan Manggis, Kecamatan Magelang Utara, Kota Magelang, Jawa Tengah, 56115.',
                'image' => 'HUTAMA RESTO MAGELANG.png',
            ],
            [
                'name' => 'HutamaResto: Surakarta',
                'address' => 'Jalan Merdeka No. 45, Kelurahan Kratonan, Kecamatan Serengan, Kota Surakarta, Jawa Tengah, 57153.',
                'image' => 'HUTAMA RESTO SURAKARTA.png',
            ],
            [
                'name' => 'HutamaResto: Jakarta',
                'address' => 'Jalan Jenderal Sudirman No. 10, Kelurahan Karet, Kecamatan Setiabudi, Kota Jakarta Selatan, DKI Jakarta, 12920.',
                'image' => 'HUTAMA RESTO JAKARTA.png',
            ]
        ] as $data) {
            Franchise::create([
                'name' => $data['name'],
                'address' => $data['address'],
                'image' => 'seeder/restaurants/' . $data['image'],
            ]);
        }
    }
}
