<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'amount',
    ];

    // Define the relationship with User if needed
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
