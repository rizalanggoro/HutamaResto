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
        'user_id',
        'franchise_id',
        'status',
    ];

    public function franchise(): BelongsTo {
        return $this->belongsTo(Franchise::class, 'franchise_id');
    }

    public function orderItems(): HasMany {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function reviews(): HasMany {
        return $this->hasMany(Review::class, 'order_id');
    }
}
