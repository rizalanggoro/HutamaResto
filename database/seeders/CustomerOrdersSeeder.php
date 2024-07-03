<?php

namespace Database\Seeders;

use App\Models\Franchise;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Storage;

class CustomerOrdersSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $customer = User::whereRole('customer')->firstOrFail();
        $franchise = Franchise::first();
        $menus = $franchise->menus()->get();

        for ($a = 0; $a < 10; $a++) {
            $order = Order::create([
                'user_id' => $customer->id,
                'franchise_id' => $franchise->id,
                'status' => $a % 2 === 0 ? 'waiting_payment' : 'waiting_payment_verification',
                'receipt_path' => $a % 2 === 0 ? null : Storage::disk('public')->url('seeder/receipts/bukti transer.jpg'),
            ]);

            for ($b = 0; $b < rand(1, count($menus)); $b++) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_id' => $menus[$b]->id,
                    'count' => rand(1, 5),
                ]);
            }
        }

        for ($a = 0; $a < 7; $a++) {
            $order = Order::create([
                'user_id' => $customer->id,
                'franchise_id' => $franchise->id,
                'status' => 'done',
            ]);

            for ($b = 0; $b < rand(1, count($menus)); $b++) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_id' => $menus[$b]->id,
                    'count' => rand(1, 5),
                ]);
            }
        }
    }
}
