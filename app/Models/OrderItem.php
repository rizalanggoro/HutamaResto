<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model {
    use HasFactory;
    protected $fillable = ['id_order', 'id_menu', 'count'];

    public function menu(): BelongsTo {
        return $this->belongsTo(Menu::class, 'id_menu');
    }
}
