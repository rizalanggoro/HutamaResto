<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Franchise extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'image',
        'is_open',
    ];

    public function menus(): HasMany {
        return $this->hasMany(Menu::class, 'franchise_id');
    }

    public function orders(): HasMany {
        return $this->hasMany(Order::class, 'franchise_id');
    }

    public function users() {
        return $this->belongsToMany(User::class, 'admin_franchise');
    }

    public function reviews() {
        return $this->hasMany(Review::class, 'franchise_id');
    }

    public function incomeThisMonth() {
        return collect(OrderItem::with(['order', 'menu'])
            ->whereHas(
                'order',
                fn ($q) =>  $q->where([
                    ['status', '=', 'done'],
                    ['franchise_id', '=', $this->id],
                ])
            )
            ->get())
            ->sum(fn ($item) => $item->menu->price * $item->count);
    }
}
