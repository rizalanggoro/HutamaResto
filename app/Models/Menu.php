<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model {
    use HasFactory;

    protected $fillable = [
        'franchise_id',
        'name',
        'description',
        'availability',
        'type',
        'price',
        'image',
    ];

    public function orderItems() {
        return $this->hasMany(OrderItem::class, 'menu_id');
    }
}
