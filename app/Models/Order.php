<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model {
    use HasFactory;

    protected $table = 'orders';
    protected $fillable = [
        'id_user',
        'id_franchise',
    ];

    public function franchise(): BelongsTo {
        return $this->belongsTo(Franchise::class, 'id_franchise');
    }

    public function orderItems(): HasMany {
        return $this->hasMany(OrderItem::class, 'id_order');
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'id_user');
    }
}
