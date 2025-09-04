<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasFactory;
    // Metode Mass Assignment
    protected $fillable = ['title', 'author', 'slug', 'body'];

    // untuk menghubungkan dari author_id (Posts) ke id (Users)
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
