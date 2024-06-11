<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Franchise extends Model {
    use HasFactory;

    public function menus(): HasMany {
        return $this->hasMany(Menu::class, 'id_franchise');
    }

    public function orders(): HasMany {
        return $this->hasMany(Order::class, 'id_franchise');
    }
}
