<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model {
    use HasFactory;
    protected $fillable = [
        'star',
        'review',
        'user_id',
        'order_id',
        'franchise_id',
    ];

    public function franchise() {
        return $this->belongsTo(Franchise::class, 'franchise_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
