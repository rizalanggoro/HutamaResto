<?php

namespace Database\Seeders;

use App\Models\Franchise;
use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Storage;

class MenusSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $franchises = Franchise::all();
        foreach ($franchises as $franchise) {
            foreach ([
                [
                    'name' => 'Nasi Goreng Special',
                    'description' => 'Nasi goreng dengan campuran ayam, udang, dan telur, disajikan dengan kerupuk dan acar.',
                    'price' => 30000
                ],
                [
                    'name' => 'Sate Ayam',
                    'description' => 'Sate ayam dengan bumbu kacang khas, disajikan dengan lontong dan acar.',
                    'price' => 25000
                ],
                [
                    'name' => 'Mie Ayam',
                    'description' => 'Mie ayam dengan potongan ayam suwir, sawi, dan bakso, disajikan dengan kuah kaldu.',
                    'price' => 20000
                ],
                [
                    'name' => 'Rendang Daging',
                    'description' => 'Daging sapi dimasak dengan bumbu rendang khas Padang, disajikan dengan nasi putih.',
                    'price' => 40000
                ],
                [
                    'name' => 'Ayam Bakar',
                    'description' => 'Ayam bakar dengan bumbu kecap manis, disajikan dengan nasi uduk dan sambal.',
                    'price' => 35000
                ],
                [
                    'name' => 'Gado-Gado',
                    'description' => 'Salad sayuran dengan bumbu kacang, dilengkapi dengan tahu, tempe, dan lontong.',
                    'price' => 25000
                ],
                [
                    'name' => 'Soto Ayam',
                    'description' => 'Sup ayam dengan bumbu kunyit, dilengkapi dengan soun, telur, dan daun bawang.',
                    'price' => 22000
                ],
                [
                    'name' => 'Bakso',
                    'description' => 'Bakso sapi dengan kuah kaldu, dilengkapi dengan mie, tahu, dan sayuran.',
                    'price' => 20000
                ],
                [
                    'name' => 'Nasi Uduk',
                    'description' => 'Nasi yang dimasak dengan santan, disajikan dengan ayam goreng, sambal, dan telur dadar.',
                    'price' => 30000
                ],
                [
                    'name' => 'Pecel Lele',
                    'description' => 'Lele goreng dengan sambal terasi, disajikan dengan nasi putih dan lalapan.',
                    'price' => 25000
                ],
                [
                    'name' => 'Nasi Campur Bali',
                    'description' => 'Nasi campur dengan sate lilit, ayam betutu, lawar, dan sambal matah.',
                    'price' => 35000
                ],
                [
                    'name' => 'Ayam Geprek',
                    'description' => 'Ayam goreng tepung yang digeprek dengan sambal bawang pedas.',
                    'price' => 28000
                ],
                [
                    'name' => 'Bubur Ayam',
                    'description' => 'Bubur nasi dengan ayam suwir, cakwe, kacang, dan kerupuk.',
                    'price' => 18000
                ],
                [
                    'name' => 'Sop Buntut',
                    'description' => 'Sop buntut sapi dengan kuah bening, dilengkapi dengan sayuran dan emping.',
                    'price' => 45000
                ],
                [
                    'name' => 'Tahu Gejrot',
                    'description' => 'Tahu goreng yang disajikan dengan bumbu kecap manis pedas dan irisan bawang merah.',
                    'price' => 15000
                ]
            ] as $food) {
                Menu::create([
                    'franchise_id' => $franchise->id,
                    'name' => $food['name'],
                    'description' => $food['description'],
                    'type' => 'food',
                    'price' => $food['price'],
                    'image' => 'seeder/menus/' . $food['name'] . '.png',
                ]);
            }

            foreach ([
                [
                    'name' => 'Es Teler',
                    'description' => 'Minuman segar dengan campuran kelapa muda, alpukat, nangka, dan susu kental manis.',
                    'price' => 18000
                ],
                [
                    'name' => 'Es Cendol',
                    'description' => 'Minuman tradisional dengan cendol, santan, gula merah, dan es serut.',
                    'price' => 15000
                ],
                [
                    'name' => 'Es Campur',
                    'description' => 'Minuman dingin dengan campuran buah-buahan, kolang-kaling, cincau, dan sirup.',
                    'price' => 20000
                ],
                [
                    'name' => 'Jus Alpukat',
                    'description' => 'Jus alpukat segar dengan tambahan susu kental manis dan cokelat.',
                    'price' => 18000
                ],
                [
                    'name' => 'Teh Tarik',
                    'description' => 'Minuman teh dengan susu kental manis, disajikan dengan es batu atau panas.',
                    'price' => 12000
                ],
                [
                    'name' => 'Es Kelapa Muda',
                    'description' => 'Minuman segar dari kelapa muda dengan tambahan sirup gula dan es batu.',
                    'price' => 15000
                ],
                [
                    'name' => 'Wedang Jahe',
                    'description' => 'Minuman hangat dengan rasa jahe, gula merah, dan rempah-rempah.',
                    'price' => 10000
                ],
                [
                    'name' => 'Kopi Tubruk',
                    'description' => 'Kopi hitam tradisional Indonesia yang diseduh langsung dari biji kopi bubuk.',
                    'price' => 12000
                ],
                [
                    'name' => 'Es Jeruk',
                    'description' => 'Minuman segar dari jeruk peras dengan tambahan es batu.',
                    'price' => 10000
                ],
                [
                    'name' => 'Bajigur',
                    'description' => 'Minuman hangat dari santan, gula aren, dan jahe, cocok untuk dinikmati saat cuaca dingin.',
                    'price' => 12000
                ]
            ] as $beverage) {
                Menu::create([
                    'franchise_id' => $franchise->id,
                    'name' => $beverage['name'],
                    'description' => $beverage['description'],
                    'type' => 'beverage',
                    'price' => $beverage['price'],
                    'image' => 'seeder/menus/' . $beverage['name'] . '.png',
                ]);
            }
        }
    }
}
