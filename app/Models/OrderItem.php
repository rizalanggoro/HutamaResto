<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model {
    use HasFactory;
    protected $fillable = ['order_id', 'menu_id', 'count'];

    public function menu(): BelongsTo {
        return $this->belongsTo(Menu::class, 'menu_id');
    }
}
