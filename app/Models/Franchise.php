<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Franchise extends Model {
    use HasFactory;

    protected $fillable = [
        'name', 'address', 'is_open',
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
}
